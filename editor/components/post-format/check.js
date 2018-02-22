/**
 * WordPress dependencies
 */
import { withContext } from '@wordpress/components';

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';

function PostFormatCheck( { themeSupportsPostFormats, ...props } ) {
	return themeSupportsPostFormats &&
		<PostTypeSupportCheck { ...props } supportKeys="post-formats" />;
}

export default withContext( 'editor' )(
	( settings ) => ( {
		themeSupportsPostFormats: settings.themeSupportsPostFormats,
	} )
)( PostFormatCheck );

