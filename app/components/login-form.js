import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginFormComponent extends Component {
  @tracked
  userId = null;

  get isDisabled() {
    return !this.userId
  }

  @action
  onSelectChanged(event) {
    this.userId = event.target.value
  }

  @action
  onLoginFormSubmit(event) {
    const { target } = event;
    const val = target.querySelector('select').value;
    event.preventDefault();
    this.loginAsUserWithId(val)
  }

  loginAsUserWithId(val) {
    console.log('userId:', val);
  }
}
