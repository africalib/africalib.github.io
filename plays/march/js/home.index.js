let app = angular.module('app', []);
app.controller('homeIndexCtrl', function ($scope, $http, $timeout, $interval) {
	let go = function(player) {
		$('#homeIndex').submit();
	};
	
	let addDots = function(){
		interval['addDots'] = $interval(function(){
			$scope.dots += '.'
			if($scope.dots.length > 30)
				$scope.dots = '.';
		}, 100);
	};
	
	let interval = {};
	let roomId = 0;
	let timer = {};
	
	$scope.faded = false;
	$scope.player = 'black';
	
	$scope.closeFade = function(){
		$scope.faded = false;
		let args = {
			id : roomId,
			kind : 'delete'
		};
		
		$http({
			url: './?ctrl=api&act=connect', 
			method: 'post',
			params: args
		});
        
        $scope.dots = '.';
		$interval.cancel(interval['enter']);
		$interval.cancel(interval['addDots']);
		clearTimeout(timer['offline']);
	}
	
	$scope.copy = function(){
		$url = document.getElementById('url');
		$url.select();
		document.execCommand('copy');
		appLib.bandMessage('success', '복사하였습니다.', 2000);
	}
	
	$scope.dots = '.';
	
	$scope.enter = function(isOnline, id) {
		if(isOnline) {
			let args = {
				id : id,
				kind : 'first'
			};
			
			roomId = id;
			$('#homeIndex input[name=act]').val('online');
			
			$http({
				url: './?ctrl=api&act=connect', 
				method: 'post',
				params: args
			}).then(function(res){
				switch(res.data) {
					case '0':
						$scope.faded = true;
						addDots();
						
						interval['enter'] = $interval(function(){
							args.kind = 'another';
							
							$http({
								url: './?ctrl=api&act=connect', 
								method: 'post',
								params: args
							}).then(function(res){
								switch(res.data){
									case '1':
										if($scope.faded)
											$('#homeIndex').submit();
										break;
								}
							});
						}, 1000);
						
						break;
						
					case '1':
						$scope.faded = true;
						$scope.player = 'white';
						addDots();
						
						$timeout(function() {
							if($scope.faded)
								$('#homeIndex').submit();
						}, 1000);
					break;
					
					default:
						appLib.bandMessage('warning', '게임이 이미 진행 중이거나 종료된 방입니다.');
					break;
				}
			});
		}
		else {
			$scope.faded = true;
			addDots();
			
			timer['offline'] = setTimeout(function(){
				location.href = './?ctrl=app&act=offline';
			}, 1000);
		}
	}
});