import { Selector } from 'testcafe';

class StudentNavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoHomePage(testController) {
    await testController.click('#second-menu-home');
  }

  async gotoCourseExplorerPage(testController) {
    await testController.click('#student-menu-explore');
    await testController.click('#courses');
  }
}

export const studentNavBar = new StudentNavBar();
