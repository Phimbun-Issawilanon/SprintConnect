
export class Alert {
  alertDetail: any = {
    msg: null,
    type: null
  };
  message: any = {
    passwordPattern: 'Password must be at least 8 characters long contain a number, capital letter, small letters, and symbolic',
    loginPage: {
      usernamePassword: 'Username and Password is not correct.'
    },
    resetPasswordPage: {
      checkEmail: 'Please check your email.'
    },
    profilePage: {
      imageSize: 'Image size must less than 2MB.',
      imageType: 'Image type must be JPEG, JPG, and PNG only.',
      sameOldNewPassword: 'Old password and new password cannot be same.',
      mustSamePassword: 'New password and confirm new password must be same.',
      loginNewPassword: 'You should logout and login with new password.',
    },
    paginationComponent: {
      currentPageNotNull: 'Please input value of current page.'
    }
  };
  type: any = {
    error: 'danger',
    success: 'success'
  };
  id: any = {
    alertBtn: 'alertBtn'
  };
}
