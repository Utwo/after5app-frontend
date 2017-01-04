import { TttPage } from './app.po';

describe('ttt App', function() {
  let page: TttPage;

  beforeEach(() => {
    page = new TttPage();
  });

  it('should display after5app text', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('After5app');
  });
});
