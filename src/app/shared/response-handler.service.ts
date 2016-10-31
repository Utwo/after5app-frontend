import {Injectable} from '@angular/core';
import {StateService} from "./state.service";
import {Router} from "@angular/router";

@Injectable()
export class ResponseHandlerService {
  constructor(private state: StateService, private router: Router) {
  }

  successMessage(message) {
    this.showMessage(message);
    //document.getElementById("status-message").classList.add("success", "info-message-activate");
  }

  errorMessage(message, error) {
    if (error == 401) {
      this.state.logout();
      this.router.navigate(['/']);
      return;
    }

    message = (error == 0) ? message : message + " (" + error + ")";
    this.showMessage(message);
    //document.getElementById("status-message").classList.add("error", "info-message-activate");
  }

  showMessage(message) {
    alert(message);
    // const status_message = document.getElementById("status-message");
    // status_message.innerHTML = message;
    // status_message.classList.remove("success", "error", "info-message-activate");
    // const new_elem = status_message.cloneNode(true);
    // status_message.parentNode.replaceChild(new_elem, status_message);
    //document.getElementById("status-message").offsetWidth =document.getElementById("status-message").offsetWidth;
  }
}
