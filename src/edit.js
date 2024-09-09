"use strict";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';
import { Notice, PanelBody, TextControl, ComboboxControl } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const { label, menuSlug, linkUrl } = attributes;
	const blockProps = useBlockProps();

	// Get the Url for the template part screen in the Site Editor.
	const siteUrl = useSelect( ( select ) => select( 'core' ).getSite()?.url );
	const menuTemplateUrl = siteUrl
		? siteUrl +
		'/wp-admin/site-editor.php?categoryId=menu&postType=wp_template_part'
		: '';

	// Fetch all template parts.
	const { hasResolved, records } = useEntityRecords(
		'postType',
		'wp_template_part',
		{
			per_page: -1,
		}
	);

	let menuOptions = [];

	// Filter the template parts for those in the 'menu' area.
	if ( hasResolved ) {
		menuOptions = records
			.filter( ( item ) => item.area === 'menu' )
			.map( ( item ) => ( {
				label: item.title.rendered,
				value: item.slug,
			} ) );
	}

	const hasMenus = menuOptions.length > 0;
	const selectedMenuAndExists = menuSlug
		? menuOptions.some( ( option ) => option.value === menuSlug )
		: true;

	// Notice for when no menus have been created.
	const noMenusNotice = (
		<Notice status="warning" isDismissible={ false }>
			{ createInterpolateElement(
				__(
					'No menu templates could be found. Create a new one in the <a>Site Editor</a>.',
					'chiilog-mega-menu-block'
				),
				{
					a: (
						<a // eslint-disable-line
							href={ menuTemplateUrl }
							target="_blank"
							rel="noreferrer"
						/>
					),
				}
			) }
		</Notice>
	);

	// Notice for when the selected menu template no longer exists.
	const menuDoesntExistNotice = (
		<Notice status="warning" isDismissible={ false }>
			{ __(
				'The selected menu template no longer exists. Choose another.',
				'mega-menu-block'
			) }
		</Notice>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="outermost-mega-menu__settings-panel"
					title={ __( 'Settings', 'chiilog-mega-menu-block' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Label', 'chiilog-mega-menu-block' ) }
						type="text"
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
						autoComplete="off"
					/>
					<TextControl
						label={ __( 'URL', 'chiilog-mega-menu-block' ) }
						type="text"
						value={ linkUrl }
						onChange={ ( urlValue ) =>
							setAttributes( { linkUrl: urlValue } )
						}
						autoComplete="off"
					/>
					<ComboboxControl
						label={ __( 'Menu Template', 'chiilog-mega-menu-block' ) }
						value={ menuSlug }
						options={ menuOptions }
						onChange={ ( value ) =>
							setAttributes( { menuSlug: value } )
						}
						help={
							hasMenus &&
							createInterpolateElement(
								__(
									'Create and modify menu templates in the <a>Site Editor</a>.',
									'mega-menu-block'
								),
								{
									a: (
										<a // eslint-disable-line
											href={ menuTemplateUrl }
											target="_blank"
											rel="noreferrer"
										/>
									),
								}
							)
						}
					/>
					{ ! hasMenus && noMenusNotice }
					{ hasMenus && ! selectedMenuAndExists && menuDoesntExistNotice }
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<RichText
					identifier="label"
					className="wp-block-navigation-item__label"
					value={ label }
					onChange={ ( labelValue ) =>
						setAttributes( {
							label: labelValue,
						} )
					}
					aria-label={ __(
						'Mega menu link text',
						'chiilog-mega-menu-block'
					) }
					placeholder={ __( 'Add label…', 'mega-menu-block' ) }
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/image',
						'core/strikethrough',
					] }
				/>
			</div>
		</>
	);
};
