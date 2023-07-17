
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entity/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  roleSelected = null;
  account: User[] = [];
  selectedRole = 0;
  currentUser !: any
  constructor(
    public userService: UserService,
    public router: Router,
    private token: TokenStorageService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EditUsersComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userId: Number;
      role: string;
    }
  ) { }

  ngOnInit(): void {
  }

  // submit data with context EDIT
  onSubmit() {

    const currentUser = this.token.getUser();
    this.userService.updateUser(this.userService.form.value).subscribe((response) => {
      // Update the token in the session storage
      currentUser.username = this.userService.form.value.username;
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      response = this.userService.form.value;
      window.location.href = '/admin/users'
    });
  }


  onClose() {
    this.dialogRef.close();
  }

  //clear data
  onClear() {
    this.userService.initializeFormGroup();
  }

}