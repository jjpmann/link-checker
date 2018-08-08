var data = {};

	$(document).ready(function() {
		// Stuff to do as soon as the DOM is ready;
		 
		console.log( 'ready!' ); 
		var $list = $('#list'),
			$link_table = $('#links table'),
			$link_body = $('tbody',$link_table),
			$run_btn = $('#run_btn'),
			$clear_btn = $('#clear_btn'),
			$reset_btn = $('#reset_btn'),			
			link_count = 0,
			$rows,
			total_rows;

		$list.keyup(function(e){

			var list = $list.val().match(/[^\r\n]+/g);

			if( list == null ) return false;

			$list.val('');

			$.each(list,function(i,v){
				if( v.length > 0 ){
					if (v.indexOf('http') === false) {
						v = 'http://'+v;
					}
					a = '<a target="_blank" href="'+v+'">'+v+'</a>';
					row = '<tr><td class="link">'+v+'</td><td></td><td></td><td></td><td></td></tr>'
					$link_body.append(row);	
				}
			});

			$rows = $('tr',$link_body);

			$('button, table').show();

			total_rows = $rows.length;

			$('th:first-child',$link_table).html( $('th:first-child',$link_table).html() + ' ' + total_rows );

		});

		$('table').on('click','td.link',function(e){
			window.open($(this).html(),'_blank');
		});

		$clear_btn.click(function(){
			$link_body.html('');
			$reset_btn.trigger('click');
		});

		$run_btn.click(function(){
			checkLinks(link_count);
		});

		$reset_btn.click(function(){
			$link_body.trigger('click');
			$('table tr').css('background','transparent');
			$('table tr td:nth-child(3)').html('');
			$('table tr td:nth-child(2)').html('');
			link_count = 0;
			checkLinks(link_count);
			//$('button, table').hide();
		});
	
	
		

		function checkLinks(i){
		
			//console.log( i, total_rows );
			if( i >=  total_rows)  return false;

			var $row = $rows[i],
				$status = $('td:nth-child(2)',$row),
				$url = $('td:nth-child(3)',$row),
				$new_status = $('td:nth-child(4)',$row),
				$new_url = $('td:nth-child(5)',$row),
				link = $('td:first-child',$row).html();

				link_count++;

				//console.log( link, link.indexOf('#') );

			if( link.indexOf('#') === 0 ) {
				$status.html('n/a');
				checkLinks(link_count);
			}
			else {

				// fix link to use php script
				link = '/curl.php?link='+encodeURIComponent(link);


				initCurl(link);
				
			} 
		
		
			
			function initCurl(link){
			
				console.log(link);
			
				curlLink(link,function(resp){
									
					$status.html(resp.http_code);
					$url.html(resp.redirect_url);

					var new_link = '/curl.php?link='+encodeURIComponent(resp.redirect_url);
										
					if( resp.http_code == 404 ){
						//console.log( $($row).find('tr').css() );
						//$($row).find('tr').css('background','green');
						$('td',$row).parent('tr').css('background','#F75353');
					}
					

					if( resp.http_code == 301 ){
						
						curlLink(new_link,function(resp){
					
							$new_status.html(resp.http_code);
							$new_url.html(resp.redirect_url);
						
						})
					}
					
					checkLinks(link_count);						
						
				},function(x,y){
					
				})		
				
				
			}

		}
		
		
		
		function curlLink(link,done_cb,fail_cb){
			
			$.ajax({ url: link, crossDomain: true, dataType: 'json'})
				.done(done_cb)
				.fail(fail_cb)
			
		}
	});