/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { withFilters } from '@wordpress/components';

const MediaUpload = ( { render } ) => render( { open: noop } );

export default withFilters( 'blocks.MediaUpload' )( MediaUpload );
