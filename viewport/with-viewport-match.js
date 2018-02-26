/**
 * External dependencies
 */
import { mapValues } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose, getWrapperDisplayName } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

/**
 * Higher-order component creator, creating a new component which renders if
 * the viewport query is satisfied or with the given optional prop name.
 *
 * @param {Object} queries  Object of prop name to viewport query.
 * @param {string} propName Optional prop name to which result is assigned.
 *
 * @see isViewportMatch
 *
 * @return {Function} Higher-order component.
 */
const withViewportMatch = ( queries ) => ( WrappedComponent ) => {
	const EnhancedComponent = compose( [
		withSelect( ( select ) => mapValues( queries, ( query ) => {
			return select( 'core/viewport' ).isViewportMatch( query );
		} ) ),
	] )( WrappedComponent );

	EnhancedComponent.displayName = getWrapperDisplayName( WrappedComponent, 'withViewportMatch' );

	return EnhancedComponent;
};

export default withViewportMatch;
