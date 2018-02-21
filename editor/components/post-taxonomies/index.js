/**
 * External Dependencies
 */
import { connect } from 'react-redux';
import { filter, identity, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { withAPIData } from '@wordpress/components';
import { compose, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import HierarchicalTermSelector from './hierarchical-term-selector';
import FlatTermSelector from './flat-term-selector';
import { getCurrentPostType } from '../../store/selectors';

export function PostTaxonomies( { postType, taxonomies, taxonomyWrapper = identity } ) {
	const availableTaxonomies = filter( taxonomies.data, ( taxonomy ) => includes( taxonomy.types, postType ) );
	const taxonomyComponents = availableTaxonomies.map( ( taxonomy ) => {
		const TaxonomyComponent = taxonomy.hierarchical ? HierarchicalTermSelector : FlatTermSelector;
		return taxonomyWrapper(
			<TaxonomyComponent
				key={ taxonomy.slug }
				restBase={ taxonomy.rest_base }
				slug={ taxonomy.slug }
			/>,
			taxonomy
		);
	} );

	// Fragment is used because enzyme shallow does not seems to handle correctly components returning just arrays.
	// Using debug method it was possible to verify shallow always output <undefined /> when arrays are used.
	return (
		<Fragment>
			{ taxonomyComponents }
		</Fragment>
	);
}

const applyConnect = connect(
	( state ) => {
		return {
			postType: getCurrentPostType( state ),
		};
	},
);

const applyWithAPIData = withAPIData( () => ( {
	taxonomies: '/wp/v2/taxonomies?context=edit',
} ) );

export default compose( [
	applyConnect,
	applyWithAPIData,
] )( PostTaxonomies );

