/**
 * WordPress Dependencies
 */
import { registerReducer, registerSelectors, registerActions, withRehydratation, loadAndPersist } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import enhanceWithBrowserSize from './mobile';
import { BREAK_MEDIUM } from './constants';
import applyMiddlewares from './middlewares';
import * as selectors from './selectors';
import * as actions from './actions';

/**
 * Module Constants
 */
const STORAGE_KEY = `WP_EDIT_POST_PREFERENCES_${ window.userSettings.uid }`;
const MODULE_KEY = 'core/edit-post';

const store = applyMiddlewares(
	registerReducer( MODULE_KEY, withRehydratation( reducer, 'preferences', STORAGE_KEY ) )
);

loadAndPersist( store, reducer, 'preferences', STORAGE_KEY );
registerSelectors( MODULE_KEY, selectors );
registerActions( MODULE_KEY, actions );
enhanceWithBrowserSize( store, BREAK_MEDIUM );

export default store;
