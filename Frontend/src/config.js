import Profile from "./components/profile";

const CONFIG = {
    DOMAIN: "http://localhost/library",
    API: {
      test:"/hello.php",
      ADMIN: "/admin.php",
      DASH:"/Books/Get_Ddata.php",
      ISSUE_BOOK:"/Books/Issue_Book.php",
      ISSUED_BOOKS: "/Books/Get_Issued_Books.php",
      ADD_LIBRIAN:"/Admin/Admin_Signup.php",
      RETURN_BOOK:"/Books/Return_Book.php",
      hello:"/hello.php",
      ExcelBOOK:"/Books/Upload_Books.php",
      BOOKS:"/Books/Fetch_Book.php",
      Fetch_user: "/User/Fetchusers.php",
      EDIT_user: "/User/Update_User_Info.php",
      Delete_user: "/User/Delete_User.php",
      users:"/User/Get_User_Info.php",
      anly:"/Admin/Analytic.php",
      ADD_BOOK:"/Books/Add_Book.php",
      REMOVE_BOOK:"/Books/Delete_book.php",
      EDIT_BOOK:"/Books/Update_book.php",
      Notification:"/User/Fetch_Notifi.php",
      SAVE_GRID:"/save_grid.php",
      Profile:"/User/Fetch_profile.php",
      dp:"/img/Dp.php",
      updateDp:"/User/update_dp.php",
      ChangePassword:"/User/Update_Password.php",
      Fine:"/User/Fine.php",
      allFine:"/Admin/fine.php",
      fine_updat:"/Admin/update_fine.php",
      renew:"/Books/renew.php",
      entry:"/lib/entry.php",
      entrylog:"/lib/entrylog.php",
    },
    IMG:"http://localhost/library/img/",

  };
  
  export default CONFIG;
  