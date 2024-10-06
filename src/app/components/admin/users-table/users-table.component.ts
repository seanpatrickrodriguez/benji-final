import { Component, OnInit } from '@angular/core';
import { User, UsersTableService } from '../../../services/admin/users-table.service';
import { AdminService } from '../../../services/admin/admin.service';


@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  error: string | null = null;
  loading: boolean = false;

  constructor(
    private usersTableService: UsersTableService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  /**
   * Fetches the list of users from Firestore using UsersTableService.
   */
  fetchUsers() {
    this.loading = true;
    this.error = null;

    this.usersTableService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Error fetching users: ' + error.message;
        this.loading = false;
      }
    });
  }

  /**
   * Deletes a user from the list.
   * @param {string} userId - The user ID to delete.
   */
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).then(() => {
        this.fetchUsers(); // Refresh the list after deletion
      }).catch((error) => {
        this.error = 'Error deleting user: ' + error.message;
      });
    }
  }
}
