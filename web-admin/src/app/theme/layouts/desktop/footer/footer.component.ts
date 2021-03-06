import { Component } from '@angular/core';

@Component({
	selector: 'ggm-footer',
	styleUrls: ['./footer.component.scss'],
	template: `
		<span class="created-by">&copy; {{year}} <b>Đồ án nhóm 12 - IS201.J22</b></span>
		<div class="socials">
			<a href="https://github.com/gennovative" target="_blank" class="ion ion-social-github"></a>
			<a href="https://www.facebook.com/FirstInteractiveTechnology/" target="_blank" class="ion ion-social-facebook"></a>
			<a href="https://www.youtube.com/channel/UCdDFUNjiCRs4ulwMPcN5taQ/" target="_blank" class="ion ion-social-youtube"></a>
		</div>
	`,
})
export class FooterComponent {
	public year: number = new Date().getFullYear();
}
