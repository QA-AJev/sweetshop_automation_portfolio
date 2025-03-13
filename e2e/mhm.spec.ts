import { test, expect } from '@playwright/test';

test.describe('Todojames Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todolist.james.am/#/')
  });

  test('has title h1', async ({ page }) => {
    //kad reikia pasirinkti pagal id, pagal class'e, pagal elementa, arba pagal elementa ir jame esanti teksta
    // cy.get('.klase')
    //cy.get('#id').contains('tekstas')

    // h1 tago ir kas jame parasyta pagal Regex
    await expect(page).toHaveTitle("To Do List");

    //pasirinkom su locator h1 ir patikrinom ar yra tekstas ToDoList
    await expect(page.locator('h1')).toHaveText('To Do List');

    //h1 taga, kurio tekstas yra To Do List cy.get('h1').contains('To Do List')

    //taip galima tik tam tikra role atliekancius elementus, mygtuka
    //h1,h2,h3 iki h6, kurie turi teksta To Do lsit
    await expect(page.getByRole('heading', { name: 'To Do List' })).toBeVisible();

    //pagal turima teksta

    await expect(page.getByText('To Do List')).toBeVisible();
  });

  test('add new item', async ({ page }) => {
    // it('Create new to do', () => {
    //     cy.get('input.new-todo').type('1 uzduotis{enter}');
    //     cy.contains('ul.todo-list li', '1 uzduotis').should('be.visible')
    // });

    await page.locator('input.new-todo').fill('1 uzduotis');
    await page.keyboard.press('Enter');
    await page.locator('input.new-todo').fill('1 uzduotis');
    await page.keyboard.press('Enter');
    await page.locator('input.new-todo').fill('1 uzduotis');
    await page.keyboard.press('Enter');

    // await page.getByText('1 uzduotis').click();      


    // console.log(page.getByText('1 uzduotis'));
    // 
    await expect(page.getByText('1 uzduotis').nth(1)).toBeVisible();

    // cy.get('.klase').contains('kazkoks tekstas')...
    // page.locator('ul.todo-list li', {hasText: '1 uzduotis'})

    //cy.get('ul.todo-list li').contains('1 uzduotis') analogas
    // page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
  });

  test('Create new to do', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
    await expect(todoItem).toBeVisible();
  });

  // test('delete item', async ({ page }) => {
  //     await page.fill('input.new-todo', '1 uzduotis');
  //     await page.press('input.new-todo', 'Enter');

  //     await page.locator('button.destroy').click({force:true});
  // });
  test('delete item', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
    await todoItem.hover();
    await todoItem.locator('button.destroy').click();
    // notVisible
    await expect(todoItem).toHaveCount(0);
  });

  test('update item', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');

    const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
    await todoItem.dblclick();

    const editInput = page.locator('input.edit');
    await editInput.fill('paredagavom');
    await editInput.press('Enter');

    const editedItem = page.locator('ul.todo-list li', { hasText: 'paredagavom' });
    await expect(editedItem).toBeVisible();


    // await page.locator('ul.todo-list li', { hasText: '1 uzduotis' }).dblclick();


  });

  test('count items', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');

    //pasirinkom visus ul li kad saraso ilgis turi buti 6
    const fullList = page.locator('ul.todo-list li');

    // cy.get('ul.todo-list li').should('have.length', 6);
    await expect(fullList).toHaveCount(6);
  });


});