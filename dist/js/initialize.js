    var nodes, edges, network;
	var steps=[];
	var algorithmSteps= [];
    var newNode = true;
	
	var secINC = 1000;
	var $algorithm_titles = {bfs: 'Αναζήτηση πρώτα σε πλάτος (BFS)', dfs: 'Αναζήτηση πρώτα σε βάθος (DFS)', };
	var $algorithm_stack = {bfs: 'Queue', dfs: 'Stack', };
	var $algorithm_overviews = {
		 bfs: 'Ο αλγόριθμος Αναζήτησης Κατά Πλάτος  (BFS - Breadth First Search) είναι ένας αλγόριθμος αναζήτησης ο οποίος ξεκινάει από τη ρίζα του δέντρου και διερευνά πρώτα τους κηόμβους του γείτονα πριν μετακινηθεί στους επόμενους γείτονες.', 
		 dfs: 'Ο αλγόριθμος Αναζήτησης Κατά Βάθος (DFS - Depth First Search) επιτυγχάνει διάσχιση ή αναζήτηση σε δέντρο ή γράφημα. Η διάσχιση ξεκινά από τη ρίζα και εξερευνά όσο το δυνατόν περισσότερο κατά μήκος κάθε κλαδί του δέντρου μέχρι να φτάσει σε αδιέξοδο.', };
	 	
	var $algorithm_pseudcode = {
		 bfs: '<ul  class="collection dfs"><a href="#!" id="" class="collection-item">procedure BFS(G,v):<span class="new badge">1</span></a><a href="#!" id="" class="collection-item">  let Q be a Queue<span class="new badge">2</span></a><a href="#!" id="" class="collection-item">Q.enqueue(v)<span class="new badge">3</span></a><a href="#!" id="" class="collection-item">while Q is not empty<span class="new badge">4</span></a><a href="#!" id="" class="collection-item">v = Q.dequeue() <span class="new badge">5</span></a><a href="#!" id="" class="collection-item"> if v is not labeled as discovered:<span class="new badge">6</span></a><a href="#!" id="" class="collection-item"> label v as discovered<span class="new badge">7</span></a><a href="#!" id="" class="collection-item">for all edges from v to w in G.adjacentEdges(v) do<span class="new badge">8</span></a><a href="#!" id="" class="collection-item"> Q.enqueue(w)<span class="new badge">9</span></a></ul>', 
		 dfs: '<ul class="collection dfs"> <a href="#!" id="" class="collection-item">procedure DFS-iterative(G,v):<span class="new badge">1</span></a> <a href="#!" id="" class="collection-item"> let S be a stack<span class="new badge">2</span></a> <a href="#!" id="" class="collection-item">S.push(v)<span class="new badge">3</span></a> <a href="#!" id="" class="collection-item">while S is not empty<span class="new badge">4</span></a> <a href="#!" id="" class="collection-item">v=S.pop() <span class="new badge">5</span></a> <a href="#!" id="" class="collection-item"> if v is not labeled as discovered:<span class="new badge">6</span></a> <a href="#!" id="" class="collection-item"> label v as discovered<span class="new badge">7</span></a> <a href="#!" id="" class="collection-item">for all edges from v to w in G.adjacentEdges(v) do<span class="new badge">8</span></a> <a href="#!" id="" class="collection-item"> S.push(w)<span class="new badge">9</span></a></ul>', };
	 
	var treeMode = true; 
	 
    // convenience method to stringify a JSON object
    function toJSON (obj) {
      return JSON.stringify(obj, null, 4);
    }

    $(window).load(function () {
     
	 
      // create an array with nodes
      nodes = new vis.DataSet();
      nodes.on('*', function () {
        $('#nodes').html(toJSON(nodes.get()));
      });
      nodes.add([
        {id: '1', label: 'A', group: 'normal'},
		{id: '2', label: 'B', group: 'normal'},
		{id: '3', label: 'C', group: 'normal'},
		{id: '4', label: 'D', group: 'normal'},
		{id: '5', label: 'E', group: 'normal'},
		{id: '6', label: 'F', group: 'normal'},
		{id: '7', label: 'G', group: 'normal'},
		{id: '8', label: 'H', group: 'normal'},
		{id: '9', label: 'I', group: 'normal'},
		{id: '10', label: 'J', group: 'normal'},
		{id: '11', label: 'K', group: 'normal'},
		{id: '12', label: 'L', group: 'normal'}
      ]);

      // create an array with edges
      edges = new vis.DataSet();
      edges.on('*', function () {
        $('#edges').html(toJSON(edges.get()));
      });
      edges.add([
        {id: "1", from: "1", to: "2"},
		{id: "2", from: "1", to: "3"},
		{id: "3", from: "1", to: "4"},
		{id: "4", from: "2", to: "5"},
		{id: "5", from: "2", to: "6"},
		{id: "6", from: "4", to: "7"},
		{id: "7", from: "4", to: "8"},
		{id: "8", from: "5", to: "9"},
		{id: "9", from: "5", to: "10"},
		{id: "10",from: "7", to: "11"},
		{id: "11",from: "7", to: "12"}
      ]);
		createNetwork(nodes,edges);

	  
	 $('#main-timeline').on('click','.collection-item', function() {
		
		$('#main-timeline .active').removeClass('active');
		$(this).addClass('active');
		// showStep( $(this).attr('id') );
		showAlgorStep( $(this).attr('id') );
	 });
    
	
	$('#saveButton').click(function () {

	  if(newNode = true){
			try {
			  nodes.add({
				id: $('#node-id').val(),
				label: $('#node-label').val(),
				group: 'normal'
			  });
			}
			catch (err) {
			  alert(err);
			}
		}
		else{
			try {
			  nodes.update({
				id: $('#node-id').val(),
				label: $('#node-label').val()
			  });
			}
			catch (err) {
			  alert(err);
			}
		}
	 });

	var queue = [];
	queue.push(2);         // queue is now [2]
	queue.push(5);         // queue is now [2, 5]
	var i = queue.shift(); // queue is now [5]

	  
	  
	});
	
	function clearPopUp() {
        var saveButton = document.getElementById('saveButton');
        var cancelButton = document.getElementById('cancelButton');
        saveButton.onclick = null;
        cancelButton.onclick = null;
        var div = document.getElementById('network-popUp');
        div.style.display = 'none';
		$('.overlay').removeClass('active');
      }
	  
     
      function saveData(data,callback) {
        var $idInput = $('#node-id');
        var $labelInput = $('#node-label');

        data.id = $idInput.val();
        data.label = $labelInput.val();
        clearPopUp();
        callback(data);
		$('.overlay').removeClass('active');
      }
	
	
	function changeSpeed(){
	      secINC = $('#animspeed').val();
		  alert('Animation Speed was changed to '+secINC);
	  }
	
	
	
	/*!
	 * Create Network - Function
	 *
	 * This is where the magic happens
	 * Change the information for the algorithm - {title, overview, button, pseudocode}
	 * We use arrays 'algorithm_titles', 'algorithm_overviews', 'algorithm_pseudcode' to store the info
	 * Documentation: http://visjs.org/docs/network/nodes.html
	 *
	 */  
	function createNetwork(nodes,edges){
		 
		//define the network DOM element container 
		var container = $('#network').get(0);
		 
		nodes.on('*', function () {
			$('#nodes').html(toJSON(nodes.get()));
		});
		
		//create the Network Data based on 'nodes' and 'edges' datasets
		var data = {
			nodes: nodes,
			edges: edges
		};
            
			
		//define the network options - use documentation to add more options
		var options = {
			 edges: {
				width: 2,
				color: {
					color: '#222',
					highlight: '#FFC107',
				},
			 },
			 groups: {
				 normal: {
					color: {
					  border: '#03A9F4',
					  background: '#2196F3',
					  highlight: {
						border: '#fff',
						background: '#03A9F4'
					  }
					},
					font: {
						color: '#fff',
						face: 'Roboto',
						size: 13,
						align: 'center',
					},
					shape: 'circle',
				  },
				  visited: {
					color: {
					  border: '#fff',
					  background: '#9e9e9e',
					  highlight: {
						border: '#fff',
						background: '#9e9e9e'
					  }
					},
					font: {
						color: '#fff',
						face: 'Roboto',
						size: 13,
						align: 'center',
					}
				  },
				  added: {
					color: {
					  border: '#fff',
					  background: '#4CAF50',
					  highlight: {
						border: '#fff',
						background: '#4CAF50'
					  }
					},
					font: {
						color: '#fff',
						face: 'Roboto',
						size: 13,
						align: 'center',
					}
				  },
				  active: {
					color: {
					  border: '#fff',
					  background: '#FF5722',
					  highlight: {
						border: '#fff',
						background: '#FF5722'
					  }
					},
					font: {
						color: '#fff',
						face: 'Roboto',
						size: 13,
						align: 'center',
					}
				  },
				  deleted: {
					color: {
					  border: '#fff',
					  background: '#f44336',
					  highlight: {
						border: '#fff',
						background: '#f44336'
					  }
					},
					font: {
						color: '#fff',
						face: 'Roboto',
						size: 13,
						align: 'center',
					}
				  }
			  // add more groups here
			  },
			  layout: {
					hierarchical: {
					  enabled:true,
					  levelSeparation: 100,
					  nodeSpacing: 100,
					  treeSpacing: 200,
					  blockShifting: true,
					  edgeMinimization: true,
					  parentCentralization: true,
					  sortMethod: 'directed'
					}
				 },
			//function add node
			manipulation: {
				enabled: true,
				addNode: function(data,callback) {
				 
				  newNode = true;
				  $('#operation').html("Add Node");

				  var saveButton = document.getElementById('saveButton');
				  var cancelButton = document.getElementById('cancelButton');
					console.log(nodes.get());	 
				  var new_node_id = nodes.length + 1;
				  $('#node-id').val( new_node_id );
				  $('#node-label').val( data.label );
				  
				 
				  saveButton.onclick = saveData.bind(this,data,callback);
				  cancelButton.onclick = clearPopUp.bind();
				  
				  $('#network-popUp').css('display','block');
				  $('.overlay').addClass('active');
				  $('#node-label').val('').focus();
				},
				addEdge: function(data,callback) {
					var newid = edges.length + 1;
					newdata = {id: newid, from: data.from, to: data.to};
					callback(newdata);
				
				}
			}
		  };
		  
	
		//create a new network based on 'container', 'data' and 'options'
		network = new vis.Network(container, data, options);
	
		
		//initialize the tooltip for the edit btn
		// jQuery('.vis-button.vis-edit.vis-edit-mode').tooltip({position:'bottom',delay:10,tooltip: 'Click to add and manage nodes and edges'});
	}
	  
	
	
	/*!
	 * Empty Data - Function
	 *
	 * clears all the DOM elements used for the algorithms
	 *
	 */ 
	function emptyData(){
		 
		steps=[];
		algorithmSteps =[];
		letters = true;
		$('.tree-graph-mode').removeClass('green white-text');
		$('.arrows-for-edges').removeClass('green white-text');
		$('.letters-to-numbers').removeClass('green white-text');
		$('#output-stack').empty();
		$('#stack-status').empty();
		$('#visited-status').empty();
		$('#state-array').empty();
		$('#children-array').empty();
		$('#vs').empty();
		$('#main-timeline').empty();
	}  
	  
	  
	  
	/*!
	 * Clear the Network - Event Handler
	 * 
	 * Destory the network completely
	 * Define new empty nodes and edges datasets
	 * Create a new network with these empty datasets
	 *
	 */   
	$('#all-steps i').on('click',function(){  
		$('#all-steps-panel').modal('open');
	  });
	  
	/*!
	 * Change Algorithm - Event Handler
	 *
	 * On select dropdown change get the algorithm we want to run
	 * Change the information for the algorithm - {title, overview, button, pseudocode}
	 * We use arrays 'algorithm_titles', 'algorithm_overviews', 'algorithm_pseudcode' to store the info
	 *
	 */  
	  $('#algorithm-select').on('change',function(){
			var $algorithm = $(this).val()
			
			var $algo_btn = $('.side-nav button.run-btn');
			var $algo_title = $('.side-nav h2');
			var $algo_overview = $('.algo-overview');
			
			$algo_title.text($algorithm_titles[$algorithm])
			$algo_overview.text($algorithm_overviews[$algorithm])
			$algo_btn.text('RUN '+$algorithm);
			$algo_btn.attr('onclick',$algorithm+'()');
			// $('.stack-name').text($algorithm_stack[$algorithm])
			
			$('#test2').html($algorithm_pseudcode[$algorithm]);
	  });
	  
	  
  
  	/*!
	 * Tree/Graph Mode  - Event Handler
	 *
	 * On button click set the new options for the network
	 * to enable hierarchical tree layout.
	 */ 
	  
	  
	  $('.tree-graph-mode').on('click',function(){
		  	
			$(this).toggleClass('green white-text');
			
			//change button color/icon
			if ( treeMode == false){
				treeMode = true;
				$(this).children('i').text('device_hub');
			}
			else {
				treeMode = false;
				$(this).children('i').text('grain');
			}
			
			//define the new options for network
			var optionsNew = {
				layout: {
					hierarchical: {
					  enabled:treeMode,
					  levelSeparation: 100,
					  nodeSpacing: 100,
					  treeSpacing: 200,
					  blockShifting: true,
					  edgeMinimization: true,
					  parentCentralization: true,
					  sortMethod: 'directed'
					}
				 },
				 
			  };
			  
			 //set the new options for network and redraw it
			network.setOptions(optionsNew);
			network.redraw();
	  });
	  
	    
  
  	/*!
	 * Use arrows for edges  - Event Handler
	 *
	 * On button click set the new options for the network
	 * to enable hierarchical tree layout.
	 */ 
	  var arrows = false;
	  $('.arrows-for-edges').on('click',function(){
		  	
			//change button color/icon
			if ( arrows == false){
				arrows = true;
				$(this).addClass('green white-text');
			}
			else {
				arrows = false;
				$(this).removeClass('green white-text');
			}
			
			//define the new options for network
			var optionsNew = {
				
				 edges: {
					width: 2,
					color: {
						color: '#222'
					},
					arrows: {
						to:{
							enabled: arrows,
							scaleFactor: 0.5,
						},
					}
				 },
			  };
			  
			 //set the new options for network and redraw it
			network.setOptions(optionsNew);
			network.redraw();
	  });
	  
	  
	/*!
	 * Clear the Network - Event Handler
	 * 
	 * Destory the network completely
	 * Define new empty nodes and edges datasets
	 * Create a new network with these empty datasets
	 *
	 */   
	$('.destroy-network').on('click',function(){
		
		//clear the network
		network.destroy();
		
		//define new datasets for nodes and edges
		nodes = new vis.DataSet();
		
		nodes.on('*', function () {
			$('#nodes').html(toJSON(nodes.get()));
		});

		edges = new vis.DataSet();
		
		edges.on('*', function () {
			$('#edges').html(toJSON(edges.get()));
		});
		
		//create the network based on nodes and edges Dataset
		createNetwork(nodes,edges);

	
	});
	  
	  
	/*!
	 * Generate Nodes - Event Handler
	 *
	 * Destory the network completely
	 * get the the number of nodes the user wants to generate '#numofnodes'
	 * get a portion of the array 'all_letters' - defined in examples.js
	 *
	 */   
	$('.generate-nodes').on('click',function(){
	
		//clear the network
		network.destroy();
		
		//get the number of nodes to generate
		var num_of_nodes = $('#numofnodes').val();
		
		if( num_of_nodes == null ){
			num_of_nodes = 10;
		}
		
		//create a new array of nodes with length num_of_nodes
		all_letters =  all_letters.slice( 0,num_of_nodes );
		   
		   
		//define new datasets for nodes and edges
		nodes = new vis.DataSet();
		
		nodes.on('*', function () {
			$('#nodes').html(toJSON(nodes.get()));
		});
		nodes.add(all_letters);

		edges = new vis.DataSet();
		
		edges.on('*', function () {
			$('#edges').html(toJSON(edges.get()));
		});
      
		//create the network based on nodes and edges Dataset
		createNetwork(nodes,edges);

     
	});
	  
	  
	/*!
	 * Check new node input - Event Handler
	 *
	 * On select change get the example the user wants to load
	 * Destroy the network and create new nodes and edges datasets
	 * Add the data from the example to the datasets and create a new network
	 * The example datasets are located in examples.js
	 *
	 */  
	  $('#node-label').on('keyup',function(){  
		 checkIfCorret();
			
	  
	  });
	  
	  function checkIfCorret(){
		   var $network_dom = $('#network');
		  var $value = $('#node-label').val();
		  
		  if( $.isNumeric($value) && !$network_dom.hasClass('with-numers') ){
			  alert( 'Please use letters for new nodes.Otherwise change the letters to numbers from the display button.' );
			  $('#node-label').val('').focus();
		  }
		  else if( !$.isNumeric($value) && $network_dom.hasClass('with-numers') ){
			  alert( 'Please use numbers for new nodes.Otherwise change the letters to numbers from the display button.' );
			  $('#node-label').val('').focus();
		  }
	  }
	  
	  
	/*!
	 * Load Graph - Event Handler
	 *
	 * On select change get the example the user wants to load
	 * Destroy the network and create new nodes and edges datasets
	 * Add the data from the example to the datasets and create a new network
	 * The example datasets are located in examples.js
	 *
	 */  
	  $('#example-graph').on('change',function(){
			
			emptyData();
			
			//the example to load
			var $example = $(this).val()
			
			//destory the network
			network.destroy();
			
			//define new datasets for nodes and edges
			nodes = new vis.DataSet();
			nodes.on('*', function () { $('#nodes').html(toJSON(nodes.get())); });
			
			edges = new vis.DataSet();
			edges.on('*', function () { $('#edges').html(toJSON(edges.get())); });
		  
			treeMode = false;
			
			//load the example
			switch( $example ) {
				
				case '1':
				
					nodes.add( example_1_nodes );
					edges.add( example_1_edges );
					treeMode = true;
					
					break;
					
				case '2':
				
					nodes.add( example_2_nodes );
					edges.add( example_2_edges );
					treeMode = true;
					
					break;
				case '3':
				
					nodes.add( example_3_nodes );
					edges.add( example_3_edges );
					treeMode = false;
					
					break;
			} 
			
			//create the new network based on the example nodes and edges dataset
			createNetwork(nodes,edges);
			 
			//if the example is tree set the network layout to hierarchical tree
			if ( treeMode == true ){
				
				//define the new options for network
				var optionsNew = {
				layout: {
					hierarchical: {
					  enabled:true,
					  levelSeparation: 100,
					  nodeSpacing: 100,
					  treeSpacing: 200,
					  blockShifting: true,
					  edgeMinimization: false,
					  parentCentralization: true,
					  sortMethod: 'directed'
					}
				 },
				 
				};
			  
				//set the new options to network
				network.setOptions(optionsNew);
				network.redraw();
				$('.tree-graph-mode').addClass('green white-text').children('i').text('device_hub');
			}
			else {
				$('.tree-graph-mode').removeClass('green white-text').children('i').text('grain');
			}
	  });
	  
	  
	 /*!
	 * Expand step info  - Event Handler
	 *
	 * On button click set toggle the hide class
	 * and display more info for the current step.
	 */ 
	$('.dn-right-panel').on('click','.expand-icon',function(){

		// $('.collection-item:not(.active) .info').addClass('hide');
		$(this).parent().find('.info').toggleClass('hide');
	});
		
	  
	  
	 /*!
	 * Letters to Numbers
	 *
	 * On button click set toggle the hide class
	 * and display more info for the current step.
	 */ 
	var letters = true; 
	$('.letters-to-numbers').on('click',function(){

		var $new_label;
		
		var network_nodes = nodes.get();
		var $icon = $(this).children('i');
		
		//change icon :)
		$('#network').toggleClass('with-numers');
		$(this).toggleClass('green white-text');
		
		if( letters == true ){
			
			//change the actual labels of the nodes of the network
			jQuery.each( network_nodes, function( i, val ) {
				$new_label = text_to_num( val.label,false );
				nodes.update({ id: val.id, label: $new_label });
		  
			});
			
			//Change the Step Labels
			jQuery('.node-label').each(function( index ) {
				$new_label = text_to_num( $( this ).text(),false );
				$( this ).text($new_label);
			});
						
			$icon.text('looks_one');
			letters = false; 
		
			//change the actual labels of the algorithm steps
			jQuery.each( steps, function( i, val ) {
				
				if( val.stackstatus != '' ){
					
					var $new_stackstatus = [];
					
					$.each( val.stackstatus.split(",").slice(0,-1), function(index, item) {
						$new_label = text_to_num( item,false );
						$new_stackstatus.push($new_label);
					});
					
					
					steps[i].stackstatus = $new_stackstatus.join(",");
					$('#stack-status').text($new_stackstatus.join(","));

					
				}
	
				if( val.output != '' ){
					
					var $new_stackstatus = [];
					
					$.each( val.output.split(",").slice(0,-1), function(index, item) {
						$new_label = text_to_num( item,false );
						$new_stackstatus.push($new_label);
					});
					
					
					steps[i].output = $new_stackstatus.join(",");
					$('#output-stack').text($new_stackstatus.join(","));
				}
	
		  
				if( val.visitedstatus != '' ){
					
					var $new_stackstatus = [];
					
					$.each( val.visitedstatus.split(",").slice(0,-1), function(index, item) {
						$new_label = text_to_num( item,false );
						$new_stackstatus.push($new_label);
					});
					
					
					steps[i].visitedstatus = $new_stackstatus.join(",");
					$('#visited-status').text($new_stackstatus.join(","));
				}
	
		  
			});

		}
		else {
			
			//change the actual labels of the nodes of the network
			jQuery.each( network_nodes, function( i, val ) {
				$new_label = num_to_letters(all_letters,'id',val.label)
				nodes.update({ id: val.id, label: $new_label });
		  
			});
			
			//Change the Step Labels
			jQuery('.node-label').each(function( index ) {
				$new_label = num_to_letters( all_letters,'id',$( this ).text() );
				$( this ).text($new_label);
			});
			
			
			$icon.text('font_download');
			letters = true; 
			
			
			//change the actual labels of the algorithm steps
			jQuery.each( steps, function( i, val ) {
				
				if( val.stackstatus != '' ){
					
					var $new_stackstatus = [];
					
					$.each( val.stackstatus.split(",").slice(0,-1), function(index, item) {
						$new_label = num_to_letters( all_letters,'id',item );
						$new_stackstatus.push($new_label);
					});
					
					
					steps[i].stackstatus = $new_stackstatus.join(",");
					$('#stack-status').text($new_stackstatus.join(","));

					
				}
	
				if( val.output != '' ){
					
					var $new_stackstatus = [];
					
					$.each( val.output.split(",").slice(0,-1), function(index, item) {
						$new_label = num_to_letters( all_letters,'id',item );
						$new_stackstatus.push($new_label);
					});
					
					
					steps[i].output = $new_stackstatus.join(",");
					$('#output-stack').text($new_stackstatus.join(","));
				}
	
		  
				if( val.visitedstatus != '' ){
					
					var $new_stackstatus = [];
					
					$.each( val.visitedstatus.split(",").slice(0,-1), function(index, item) {
						$new_label = num_to_letters( all_letters,'id',item );
						$new_stackstatus.push($new_label);
					});
					
					
					steps[i].visitedstatus = $new_stackstatus.join(",");
					$('#visited-status').text($new_stackstatus.join(","));
				}
	
		  
			});

		}
		
		//redraw the network
		network.redraw();
		
	});
		
		

	/*!
	 * text_to_num  - Function
	 *
	 * Transform the text to the coresponding number
	 * 
	 */ 	
	function text_to_num(txt, literal){
		if(!literal) txt= txt.toLowerCase();
		return txt.split('').map(function(c){
			return 'abcdefghijklmnopqrstuvwxyz'.indexOf(c)+1 || (literal? c: '');
		}).join(' ');
	}
	
	
	/*!
	 * text_to_num  - Function
	 *
	 * Transform the text to the coresponding number
	 * 
	 */ 	
	function num_to_letters(array, attr, value) {
		for(var i = 0; i < array.length; i++) {
			if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
				return array[i].label;
			}
		}
		return -1;
	}