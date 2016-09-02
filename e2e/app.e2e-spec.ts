import { TttPage } from './app.po';

describe('ttt App', function() {
  let page: TttPage;

  beforeEach(() => {
    page = new TttPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
