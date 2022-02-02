import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class ChatContainerComponent extends Component {
  @tracked
  messages = [];

  @service auth;

  @action
  async loadMessages() {
    const { channel: {id, teamId} } = this.args;
    const resp = await fetch(`/api/teams/${teamId}/channels/${id}/messages`);
    this.messages = await resp.json();
  }

  @action
  async createMessage(body) {
    const { channel: { id: channelId, teamId } } = this.args;
    const userId = this.auth.currentUserId;
    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teamId,
        channelId,
        userId,
        body
      })
    })
  }
}
