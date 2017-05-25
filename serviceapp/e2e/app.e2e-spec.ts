import { ServiceappPage } from './app.po';

describe('serviceapp App', () => {
  let page: ServiceappPage;

  beforeEach(() => {
    page = new ServiceappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
