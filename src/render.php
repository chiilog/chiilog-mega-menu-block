<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>

<?php
$label     = esc_html( $attributes['label'] ?? '' );
$menu_slug = esc_attr( $attributes['menuSlug'] ?? '');
$link_url  = esc_attr( $attributes['linkUrl'] ?? '' );

// Don't display the mega menu link if there is no label or no menu slug.
if ( ! $label || ! $menu_slug ) {
	return null;
}
?>
<li
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="chiilog/chiilog-mega-menu-block"
	data-wp-context='{ "isOpen": false, "breakpoint": 768 }'
	data-wp-on--mouseenter="actions.onMouseEnter"
	data-wp-on--mouseleave="actions.onMouseLeave"
	data-wp-bind--aria-expanded="context.isOpen"
	data-wp-on-window--resize="callbacks.initResizeListener"
>
	<div class="wp-block-chiilog-chiilog-mega-menu-block__menu-button">
		<a href="<?php echo $link_url; ?>"><?php echo $label; ?></a>
		<button
			data-wp-on--click="actions.toggleMegaMenu"
		>
			toggle
		</button>
	</div>
	<div class="wp-block-chiilog-chiilog-mega-menu-block__menu-container">
		<?php echo block_template_part( $menu_slug ); ?>
	</div>
</li>
