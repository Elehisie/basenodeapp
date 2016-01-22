(function() {
	'use strict';

	angular.module('app').controller('ProfileCtrl', ['$auth','$user','$filter',
	function($auth,$user,$filter) {
		var me = this;

		me.auth = $auth;
		me.show = false;

		me.username = me.auth.currentUser();
		me.roles = me.auth.currentUserRoles();
		me.isAdmin = me.auth.currentUserRoles().indexOf('admin');

		me.today = new Date();
		me.startTime = $filter('date')(me.today.getTime(),'HH:mm');
		me.finishTime = $filter('date')(me.today.setMinutes(me.today.getMinutes()+20),'HH:mm');

		me.weekDays = ['Monday','Tuesday','Wednesday','Thurday','Friday','Saturday','Sunday'];

		me.blankTaskList = ['blank','blank','blank','blank',
			'blank','blank','blank','blank','blank','blank','blank','blank',
			'blank','blank','blank','blank','blank','blank','blank','blank',
			'blank','blank','blank','blank','blank','blank','blank','blank',
			'blank','blank','blank','blank','blank','blank','blank','blank',
			'blank','blank','blank','blank','blank','blank','blank','blank',
			'blank','blank','blank','blank','blank','blank','blank','blank',
			'blank','blank','blank','blank'];

		me.items = [
			{
				//each row of the table, as goes:
				nickname: 'LarsT',
				date: me.today,
				taskList: me.blankTaskList
			},
		];

		me.show = false;
		me.selectedTDs = {};
		me.class = 'blank';

		me.dialogOpen = function(){
			me.selectedTDs = document.querySelectorAll('.selected');
			me.show = true;
		};

		me.dialogClose = function(which){
			console.log(which);
			var i=0;
			
			for (i=0;i<me.selectedTDs.length;i++) {
				// angular.element(me.selectedTDs.item(i)).removeClass('selected');
				angular.element(me.selectedTDs.item(i)).attr('selected',false);
				angular.element(me.selectedTDs.item(i)).attr('class','');
				angular.element(me.selectedTDs.item(i)).addClass(which);
			}
			console.log(me.selectedTDs);
			me.selectedTDs = {}; //make sure its blank for next
			me.show = false;
		};

		me.selectRow = function(rowId){
			var entireRow = document.querySelectorAll('td[id^="r0"]');
			console.log(entireRow);
		};

	}]); //end controller

})();
