/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js'

var history;

describe('Testing pushToHistory', () => {
    test('Testing settings', () => {
        history = pushToHistory('settings', 0);
        expect(history.state.page).toBe('settings');
    });

    test('Testing entry', () => {
        for (let entryNum = 1; entryNum <= 10; entryNum++) {
            history = pushToHistory('entry', entryNum);
            expect(history.state.page).toBe(`entry${entryNum}`);
        }
    });

    test('Testing default', () => {
        history = pushToHistory('', 0);
        expect(history.state.page).toBeUndefined();
    });
});