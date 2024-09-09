<?php
/**
 * Plugin Name:       Mega Menu Block
 * Plugin URI:        mel_cha
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Chiaki Okamoto
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       chiilog-mega-menu-block
 *
 * @package Chiilog
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function chiilog_chiilog_mega_menu_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'chiilog_chiilog_mega_menu_block_block_init' );

/**
 * Adds a custom template part area for mega menus to the list of template part areas.
 *
 * @param array $areas Existing array of template part areas.
 * @return array Modified array of template part areas including the new "Menu" area.
 */
function chiilog_chiilog_mega_menu_block_template_part_areas( array $areas ) {
	$areas[] = array(
		'area'        => 'menu',
		'area_tag'    => 'div',
		'description' => __( 'Menu templates are used to create sections of a mega menu.', 'chiilog-mega-menu-block' ),
		'icon'        => '',
		'label'       => __( 'Menu', 'mega-menu-block' ),
	);

	return $areas;
}
add_filter( 'default_wp_template_part_areas', 'chiilog_chiilog_mega_menu_block_template_part_areas' );
