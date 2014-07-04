class AdminUsersController < ApplicationController
	before_filter :authenticate_admin_user!

  def edit
    @admin_user = current_admin_user
  end

  def update_password
    @admin_user = current_admin_user
    if @admin_user.update_with_password(admin_user_params)
      sign_in @admin_user, :bypass => true
      flash[:success] = "Password Changed Successfully"
      redirect_to rails_admin.dashboard_path
    else
      flash[:errors] = @admin_user.errors.full_messages
      render "edit"
    end
  end

  private

  def admin_user_params    
    params.required(:admin_user).permit(:password, :password_confirmation,:current_password)
  end
end
