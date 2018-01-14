import { AppPage } from './app.po';

describe('swtpn App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should displaySidebar welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
