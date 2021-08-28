import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { User } from '../auth/interfaces/user.interface';
import { AuthService } from '../auth/services/auth.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private currentUser: User | null | undefined;
  private permissions = [];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUser().pipe(
      first(),
      tap(user => {
        this.currentUser = user;
        this.updateView()}
      ),
    ).subscribe();
  }

  @Input()
  set hasPermission(val: any) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop: any) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.isHidden = false;
      } else {
        this.viewContainer.clear();
        this.isHidden = true;
      }
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.permission) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permission.find(x => x === checkPermission);

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}
