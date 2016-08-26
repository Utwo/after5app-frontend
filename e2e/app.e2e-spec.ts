import { StartupFrontendPage } from './app.po';

describe('startup-frontend App', function() {
  let page: StartupFrontendPage;

  beforeEach(() => {
    page = new StartupFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
