<?php

/**
 * Class Better Smooth Scroll
 * The file that defines the core plugin class
 *
 * @author Mahesh Thorat
 * @link https://maheshthorat.web.app
 * @version 1.1
 * @package Better_Smooth_Scroll
 */
class Better_Smooth_Scroll_Admin
{
	private $plugin_name = BSS_PLUGIN_IDENTIFIER;
	private $version = BSS_PLUGIN_VERSION;
	private $notice = "";

	/**
	 * Return the tabs menu
	 */
	public function return_tabs_menu($tab)
	{
		$link = admin_url('options-general.php');
		$list = array(
			array('tab1', 'better-smooth-scroll-admin', 'fa-cogs', __('<span class="dashicons dashicons-admin-tools"></span> Settings', 'better-smooth-scroll')),
			array('tab2', 'better-smooth-scroll-admin&con=about', 'fa-info-circle', __('<span class="dashicons dashicons-editor-help"></span> About', 'better-smooth-scroll')),
			array('tab3', 'better-smooth-scroll-admin&con=donate', 'fa-info-circle', __('<span class="dashicons dashicons-money-alt"></span> Say Thanks', 'better-smooth-scroll'))
		);

		$menu = null;
		foreach ($list as $item => $value) {
			$menu .= '<div class="tab-label ' . $value[0] . ' ' . (($tab == $value[0]) ? 'active' : '') . '"><a href="' . $link . '?page=' . $value[1] . '"><span>' . $value[3] . '</span></a></div>';
		}

		echo wp_kses_post($menu);
	}

	/**
	 * Register the stylesheet file(s) for the dashboard area
	 */
	public function enqueue_backend_standalone()
	{
		wp_register_style($this->plugin_name . '-standalone', plugin_dir_url(__FILE__) . 'assets/styles/standalone.css', array(), $this->version, 'all');
		wp_enqueue_style($this->plugin_name . '-standalone');
	}

	/**
	 * Update `Options` on form submit
	 */
	public function return_update_options()
	{
		if ((isset($_POST['better-smooth-scroll-update-option'])) && ($_POST['better-smooth-scroll-update-option'] == 'true')
			&& check_admin_referer('pwm-referer-form', 'pwm-referer-option')
		) {
			$opts = array('enable_plugin' => '', 'scroll_bar_theme' => '', 'scroll_bar_color' => '', 'scroller_color' => '');

			if (isset($_POST['enable_plugin'])) {
				$opts['enable_plugin'] = 'on';
			}
			if (isset($_POST['scroll_bar_theme'])) {
				$opts['scroll_bar_theme'] = sanitize_text_field($_POST['scroll_bar_theme']);
			}
			if (isset($_POST['scroll_bar_color'])) {
				$opts['scroll_bar_color'] = sanitize_text_field($_POST['scroll_bar_color']);
			}
			if (isset($_POST['scroller_color'])) {
				$opts['scroller_color'] = sanitize_text_field($_POST['scroller_color']);
			}
			// if(isset($_POST['scroller_width']))
			// {
			// 	$opts['scroller_width'] = $_POST['scroller_width'];
			// }

			update_option('_bss_smooth_scroll', $opts);
			$this->notice = array('success', __('Your settings have been successfully updated.', 'better-smooth-scroll'));

			// header('location:' . admin_url('options-general.php?page=better-smooth-scroll-admin') . '&status=updated');
			// die();
		}
	}

	/**
	 * Return the `Options` page
	 */
	public function return_options_page()
	{
		$opts = get_option('_bss_smooth_scroll');

		// if ((isset($_GET['status'])) && ($_GET['status'] == 'updated')) {
		// 	$notice = array('success', __('Your settings have been successfully updated.', BSS_PLUGIN_IDENTIFIER));
		// }
		$nonce = wp_create_nonce('better-smooth-scroll');

		if (isset($_GET['con']) && $_GET['con'] == 'about' && wp_verify_nonce($nonce, 'better-smooth-scroll')) {
			$this->return_about_page();
		} else if (isset($_GET['con']) && $_GET['con'] == 'donate' && wp_verify_nonce($nonce, 'better-smooth-scroll')) {
			$this->return_donate_page();
		} else {
?>
			<div class="wrap">
				<section class="wpbnd-wrapper">
					<div class="wpbnd-container">
						<div class="wpbnd-tabs">
							<?php echo wp_kses_post($this->return_plugin_header()); ?>
							<main class="tabs-main">
								<?php echo wp_kses_post($this->return_tabs_menu('tab1')); ?>
								<section class="tab-section">
									<?php if (isset($this->notice) && !empty($this->notice)) { ?>
										<div class="wpbnd-notice <?php echo esc_attr($this->notice[0]); ?>">
											<span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
											<span><?php echo esc_attr($this->notice[1], 'better-smooth-scroll'); ?></span>
										</div>
									<?php } else { ?>
										<div class="wpbnd-notice info">
											<span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
											<span><?php echo esc_attr(__('Your plugin is properly configured! You can change your Scroll options using the below settings.', 'better-smooth-scroll')); ?></span>
										</div>
									<?php } ?>
									<form method="POST">
										<input type="hidden" name="better-smooth-scroll-update-option" value="true" />
										<?php wp_nonce_field('pwm-referer-form', 'pwm-referer-option'); ?>
										<div class="wpbnd-form">
											<div class="field">
												<?php $fieldID = uniqid(); ?>
												<label class="label"><span class="dashicons dashicons-text-page"></span> <?php echo esc_attr(__('Enable Smooth Scroll', 'better-smooth-scroll')); ?></label>
												<label class="switchContainer">
													<input id="<?php echo esc_attr($fieldID); ?>" type="checkbox" name="enable_plugin" class="onoffswitch-checkbox" <?php if ((isset($opts['enable_plugin'])) && ($opts['enable_plugin'] == 'on')) {
																																																				echo esc_attr('checked="checked"');
																																																			} ?> />
													<span for="<?php echo esc_attr($fieldID); ?>" class="sliderContainer round"></span>
												</label>
												<div class="small">
													<small><?php echo esc_attr(__('Default "Enable" ', 'better-smooth-scroll')); ?></small>
												</div>
											</div>
											<div class="field">
												<?php $fieldID = uniqid(); ?>
												<label class="label"><span class="dashicons dashicons-admin-site"></span> <?php echo esc_attr(__('Browsers', 'better-smooth-scroll')); ?></label>
												<label class="bssCheck">Chrome
													<input type="checkbox" checked />
													<span class="checkmark"></span>
												</label>
												<label class="bssCheck">Safari
													<input type="checkbox" checked />
													<span class="checkmark"></span>
												</label>
												<label class="bssCheck">Firefox
													<input type="checkbox" checked />
													<span class="checkmark"></span>
												</label>
												<label class="bssCheck">Opera
													<input type="checkbox" checked />
													<span class="checkmark"></span>
												</label>
												<label class="bssCheck">All Other Browsers
													<input type="checkbox" checked />
													<span class="checkmark"></span>
												</label>
												<div class="small">
													<small><?php echo esc_attr(__('Default "All Selected" ', 'better-smooth-scroll')); ?></small>
												</div>
											</div>
											<div class="field">
												<?php $fieldID = uniqid(); ?>
												<label class="label"><span class="dashicons dashicons-color-picker"></span> <?php echo esc_attr(__('Color Theme', 'better-smooth-scroll')); ?></label>
												<label class="bssCheck">No Scroll Bar
													<input type="radio" name="scroll_bar_theme" required <?php if ($opts['scroll_bar_theme'] == 'no_scroll_bar') {
																																echo esc_attr('checked');
																															} ?> value="no_scroll_bar" />
													<span class="checkmark"></span>
												</label>
												<table class="scroll-bar-table">
													<tr>
														<td>
															<label class="bssCheck">Custom
																<input type="radio" name="scroll_bar_theme" required <?php if ($opts['scroll_bar_theme'] == 'custom_color') {
																																			echo esc_attr('checked');
																																		} ?> value="custom_color" />
																<span class="checkmark"></span>
															</label>
														</td>
														<td>
															<br>
															<div class="scroll-bar custom_color">
																<div class="scroller"></div>
															</div>
															<br>
															<table class="scroll-bar-table">
																<tr>
																	<td>
																		<label>Scroll Bar Color</label><br>
																		<input type="color" name="scroll_bar_color" id="scroll_bar_color" value="<?php echo esc_attr(@$opts['scroll_bar_color']); ?>">
																	</td>
																	<td>
																		<label>Scroller Color</label><br>
																		<input type="color" name="scroller_color" id="scroller_color" value="<?php echo esc_attr(@$opts['scroller_color']); ?>">
																	</td>
																	<!-- <td>
																		<label>Width <b>(in px)</b></label><br>
																		<input type="number" name="scroller_width" id="scroller_width" class="regular-text" style="width:100px; text-align: center;" value="<?php @$opts['scroller_width']; ?>">
																	</td> -->
																</tr>
															</table>

															<script type="text/javascript">
																setBarColor = function() {
																	let scroll_bar_color = jQuery('#scroll_bar_color').val();
																	let scroller_color = jQuery('#scroller_color').val();
																	jQuery('.custom_color').css('background', scroll_bar_color);
																	jQuery('.scorll-theme.custom_color').after().css('background', scroller_color);
																	jQuery('.scroll-bar.custom_color .scroller').css('background', scroller_color);
																}
																jQuery(document).ready(function() {
																	setBarColor();
																})
																jQuery(document).on('input', '#scroll_bar_color, #scroller_color', function() {
																	setBarColor();
																});
															</script>
														</td>
													</tr>
													<tr>
														<td>
															<label class="bssCheck">Default
																<input type="radio" name="scroll_bar_theme" required <?php if ($opts['scroll_bar_theme'] == 'color_default') {
																																			echo esc_attr('checked');
																																		} ?> value="color_default" />
																<span class="checkmark"></span>
															</label>
														</td>
														<td>
															<div class="scroll-bar color_default"><b>Browser Default</b></div>
														</td>
													</tr>
												</table>
												<div class="small">
													<small><?php echo esc_attr(__('Default "Browser Default" ', 'better-smooth-scroll')); ?></small>
												</div>
											</div>

											<div class="form-footer">
												<input type="submit" class="button button-primary button-theme" value="<?php echo esc_attr(__('Update Settings', 'better-smooth-scroll')); ?>">
											</div>
										</div>
									</form>
								</section>
							</main>
						</div>
					</div>
				</section>
			</div>
		<?php
		}
	}

	/**
	 * Return the plugin header
	 */
	public function return_plugin_header()
	{
		$html = '<div class="header-plugin"><span class="header-icon"><span class="dashicons dashicons-admin-settings"></span></span> <span class="header-text">' . BSS_PLUGIN_FULLNAME . '</span></div>';
		return $html;
	}

	/**
	 * Return the `About` page
	 */
	public function return_about_page()
	{
		?>
		<div class="wrap">
			<section class="wpbnd-wrapper">
				<div class="wpbnd-container">
					<div class="wpbnd-tabs">
						<?php echo wp_kses_post($this->return_plugin_header()); ?>
						<main class="tabs-main about">
							<?php echo wp_kses_post($this->return_tabs_menu('tab2')); ?>
							<section class="tab-section">
								<img alt="Mahesh Thorat" src="https://secure.gravatar.com/avatar/13ac2a68e7fba0cc0751857eaac3e0bf?s=100&amp;d=mm&amp;r=g" srcset="https://secure.gravatar.com/avatar/13ac2a68e7fba0cc0751857eaac3e0bf?s=200&amp;d=mm&amp;r=g 2x" class="avatar avatar-100 photo profile-image" height="100" width="100">

								<div class="profile-by">
									<p>© <?php echo esc_attr(gmdate('Y')); ?> - created by <a class="link" href="https://maheshthorat.web.app/" target="_blank"><b>Mahesh Mohan Thorat</b></a></p>
								</div>
							</section>
							<section class="helpful-links">
								<b>Other Plugins</b>
								<ul>
									<li>
										<a href="//wordpress.org/plugins/ajax-loading/">
											<img srcset="https://ps.w.org/ajax-loading/assets/icon-128x128.png?rev=2838964, https://ps.w.org/ajax-loading/assets/icon-256x256.png?rev=2838964 2x" src="https://ps.w.org/ajax-loading/assets/icon-256x256.png?rev=2838964"> </a>

										<div class="plugin-info-container">
											<h4>
												<a href="//wordpress.org/plugins/ajax-loading/">AJAX Loading</a>
											</h4>
										</div>
									</li>
									<li>
										<a href="//wordpress.org/plugins/all-in-one-minifier/">
											<img srcset="https://ps.w.org/all-in-one-minifier/assets/icon-128x128.png?rev=2707658, https://ps.w.org/all-in-one-minifier/assets/icon-256x256.png?rev=2707658 2x" src="https://ps.w.org/all-in-one-minifier/assets/icon-256x256.png?rev=2707658"> </a>

										<div class="plugin-info-container">
											<h4>
												<a href="//wordpress.org/plugins/all-in-one-minifier/">All in one Minifier</a>
											</h4>
										</div>
									</li>
									<li>
										<a href="//wordpress.org/plugins/all-in-one-wp-content-security/">
											<img srcset="https://ps.w.org/all-in-one-wp-content-security/assets/icon-128x128.png?rev=2712431, https://ps.w.org/all-in-one-wp-content-security/assets/icon-256x256.png?rev=2712431 2x" src="https://ps.w.org/all-in-one-wp-content-security/assets/icon-256x256.png?rev=2712431"> </a>

										<div class="plugin-info-container">
											<h4>
												<a href="//wordpress.org/plugins/all-in-one-wp-content-security/">All in one WP Content Protector</a>
											</h4>
										</div>
									</li>
									<li>
										<a href="//wordpress.org/plugins/better-smooth-scroll/">
											<img srcset="https://ps.w.org/better-smooth-scroll/assets/icon-128x128.png?rev=2829532, https://ps.w.org/better-smooth-scroll/assets/icon-256x256.png?rev=2829532 2x" src="https://ps.w.org/better-smooth-scroll/assets/icon-256x256.png?rev=2829532"> </a>

										<div class="plugin-info-container">
											<h4>
												<a href="//wordpress.org/plugins/better-smooth-scroll/">Better Smooth Scroll</a>
											</h4>
										</div>
									</li>
								</ul>
							</section>
							<section class="helpful-links">
								<b>helpful links</b>
								<ul>
									<li><a href="https://pagespeed.web.dev/" target="_blank">PageSpeed</a></li>
									<li><a href="https://gtmetrix.com/" target="_blank">GTmetrix</a></li>
									<li><a href="https://www.webpagetest.org" target="_blank">Web Page Test</a></li>
									<li><a href="https://http3check.net/" target="_blank">http3check</a></li>
									<li><a href="https://sitecheck.sucuri.net/" target="_blank">Sucuri - security check</a></li>
								</ul>
							</section>
						</main>
					</div>
				</div>
			</section>
		</div>
	<?php
	}

	public function return_donate_page()
	{
	?>
		<div class="wrap">
			<section class="wpbnd-wrapper">
				<div class="wpbnd-container">
					<div class="wpbnd-tabs">
						<?php echo wp_kses_post($this->return_plugin_header()); ?>
						<main class="tabs-main about">
							<?php echo wp_kses_post($this->return_tabs_menu('tab3')); ?>
							<section class="">
								<table class="wp-list-table widefat fixed striped table-view-list">
									<tbody id="the-list">
										<tr>
											<td><a href="https://buymeacoffee.com/maheshmthorat" target="_blank"><img width="160" src="<?php echo esc_url(plugin_dir_url(dirname(__FILE__))); ?>admin/assets/img/razorpay.svg" /></a></td>
										</tr>
										<tr>
											<td>
												<h3>Scan below code</h3>
												<img width="350" src="<?php echo esc_url(plugin_dir_url(dirname(__FILE__))); ?>admin/assets/img/qr.svg" />
												<br>
												<img width="350" src="<?php echo esc_url(plugin_dir_url(dirname(__FILE__))); ?>admin/assets/img/upi.png" />
												<br>
												<b>Mr Mahesh Mohan Thorat</b>
												<h3>UPI - maheshmthorat@oksbi</h3>
											</td>
										</tr>
									</tbody>
								</table>
							</section>
							<section class="helpful-links">
								<b>helpful links</b>
								<ul>
									<li><a href="https://pagespeed.web.dev/" target="_blank">PageSpeed</a></li>
									<li><a href="https://gtmetrix.com/" target="_blank">GTmetrix</a></li>
									<li><a href="https://www.webpagetest.org" target="_blank">Web Page Test</a></li>
									<li><a href="https://http3check.net/" target="_blank">http3check</a></li>
									<li><a href="https://sitecheck.sucuri.net/" target="_blank">Sucuri - security check</a></li>
								</ul>
							</section>
						</main>
					</div>
				</div>
			</section>
		</div>
<?php	}

	/**
	 * Return Backend Menu
	 */
	public function return_admin_menu()
	{
		add_options_page(BSS_PLUGIN_FULLNAME, BSS_PLUGIN_FULLNAME, 'manage_options', 'better-smooth-scroll-admin', array($this, 'return_options_page'));
	}

	public function bss_settings_link($links)
	{
		$url = get_admin_url() . 'options-general.php?page=better-smooth-scroll-admin';
		$settings_link = ["<a href='$url'>" . __('Settings') . '</a>', "<a href='https://buymeacoffee.com/maheshmthorat' target='_blank'>Say Thanks</a>"];
		$links = array_merge(
			$settings_link,
			$links
		);
		return $links;
	}
}

?>