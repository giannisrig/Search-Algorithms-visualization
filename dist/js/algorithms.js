/*!
 * algorithms.js
 *
 * Here you can find the source code of the search algorithmSteps
 * BFS (Breadth First Search) and DFS (Depth First Search)
 * as long as the helper functions for saving and displaying each algorithm step
 * 
 * @author: Ioannis Michail Riganas
 * 
 */    


   //global variable used to check if the user runs DFS of BFS
	var runningDFS;


	/*!
	 * dfs - Depth First Search Algorithm Function
	 *
	 * The algorithm traverse and search the tree or graph. 
	 * It starts at the tree root ( all_nodes[0].id ) 
	 * and explores the children of the node first, before moving to the next neighbor.
	 * The algorithm is terminated after stack is empty.
	 * 
	 * Note: We declare the function as async so that we can use await sleep(ms)
	 * 
	 */
	async function dfs(){
		runningDFS = true;
		//define arrays and vars to be used
		var all_nodes = nodes.get();     
		var	stepIndex = 1;		
		var stack = [];
		var outputArray = [];
		var state;
		var	children = [];
		var secondsCount = secINC;    

		
		$( ".dn-right-panel .tabs .tab:first-child a" ).trigger( "click" );
		emptyData();
		
		
		// arrays stuff
		stack.push( all_nodes[0].id );    
		outputArray = [];			
		state = all_nodes[0].id;
		children = network.getConnectedNodes(state);   
		
		
		// save print and mark steps
		save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
		print_arrays( stepIndex, algorithmSteps  );
		print_algorithm_steps(stepIndex,algorithmSteps );
		mark_nodes( stepIndex, algorithmSteps  );
		
		
		while( stack.length!=0 ){
		
			//sleep for a while
			await sleep(secondsCount);
		
			//increment step
			stepIndex++;
									
			
			if( children.length > 0 ){
				
				outputArray = outputArray.concat(state);

				stack = children.concat(stack);
				for (var i=0; i < outputArray.length; i++){
					removeA( stack, outputArray[i]);
				}
				
				state = stack[0];
				
				children = network.getConnectedNodes( state );  
				for (var i=0; i < outputArray.length; i++){
					removeA( children, outputArray[i]);
				}
				
				save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
				print_arrays( stepIndex,algorithmSteps );
				print_algorithm_steps(stepIndex,algorithmSteps );
				mark_nodes( stepIndex, algorithmSteps );
				
			}
			else {
				outputArray = outputArray.concat(state);

				stack = children.concat(stack);
				for (var i=0; i < outputArray.length; i++){
					removeA( stack, outputArray[i]);
				}
				
				state = stack[0];
				
				children = network.getConnectedNodes( state );  
				for (var i=0; i < outputArray.length; i++){
					removeA( children, outputArray[i]);
				}
				
				save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
				print_arrays( stepIndex,algorithmSteps );
				print_algorithm_steps(stepIndex,algorithmSteps );
				mark_nodes( stepIndex, algorithmSteps );

				
			}
			
		}
		
		// Algorithm is terminated so we print all the steps
		steps_table( stepIndex, algorithmSteps  );
		
		return false;
		
	}
	
	
	/*!
	 * bfs - Bredth First Search Algorithm Function
	 *
	 * The algorithm traverse and search the tree or graph. 
	 * It starts at the tree root ( all_nodes[0].id ) 
	 * and explores the neighbor nodes first, before moving to the next level neighbors.
	 * The algorithm is terminated after stack is empty.
	 * 
	 * Note: We declare the function as async so that we can use await sleep(ms)
	 * 
	 */ 
	async function bfs(){
		
		//this is used for the print_algorithm_steps function
		runningDFS = false;
		
		
		//define arrays and vars to be used
		var all_nodes = nodes.get();     
		var	stepIndex = 1;		
		var stack = [];
		var outputArray = [];
		var state;
		var	children = [];
		var secondsCount = secINC;    
		
		
		$( ".dn-right-panel .tabs .tab:first-child a" ).trigger( "click" );
		//we empty the data
		emptyData();
		
		
		// arrays stuff
		stack.push( all_nodes[0].id );    
		outputArray = [];			
		state = all_nodes[0].id;
		children = network.getConnectedNodes(state);   
		
		
		// save, print and mark steps
		save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
		print_arrays( stepIndex, algorithmSteps  );
		print_algorithm_steps(stepIndex,algorithmSteps );
		mark_nodes( stepIndex, algorithmSteps  );
  
		
		//as long as the stack is not empty the code is executed
		while( stack.length!=0 ){
		
			//sleep for a while
			await sleep(secondsCount);
		
			//increment algorithm step
			stepIndex++;
	
			outputArray = outputArray.concat(state);	
			stack = stack.concat(children);	
			stack.shift();
			state = stack[0];	
			children = network.getConnectedNodes( state );  				
			
			//children fix by removing the parent node from the children
			//beacause getConnectedNodes function returns the connected nodes
			//and not the actual children of the node.
			for (var i=0; i < outputArray.length; i++){
				removeA( children, outputArray[i]);
			}
		   
			// save, print and mark steps
			save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
			print_arrays( stepIndex,algorithmSteps );
			print_algorithm_steps(stepIndex,algorithmSteps );
			mark_nodes( stepIndex, algorithmSteps );
		  
			
		}
		
		// Algorithm is terminated so we print all the steps
		steps_table( stepIndex, algorithmSteps  );
		return false;
		
	}
	
	
	/*!
	 * sleep - Function
	 *
	 * We use this function to stop the execution of an algorithm
	 * for the time specified in the var ms (miliseconds)
	 * This function is used on every step of the algorithm to control 
	 * how fast or slow the steps, arrays and marks are being displayed to the user
	 * 
	 * Note 1:To use this function we use the function await
	 * For example: await sleep(1000); //stop execution for 1 sec
	 * 1000ms = 1sec
	 * 
	 * Note 2: You must declare the function as async to use await sleep(ms) in it
	 * 
	 */ 
	function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	
		
	/*!
	 * save_algorithmSteps - Function
	 *
	 * This is the function that saves every algorithm step in the variable algorithm_steps
	 *
	 * int stepIndex - the current step of the algorithm
	 * array stack - array with the node ids the algorithm will explore
	 * array outputArray - the current output of the algorithm in each step
	 * int state - the id of the current state(node) of the algorithm
	 * array children - the children nodes ids of the state node
	 * array algorithmSteps - array with all the steps of the algorithm
	 * 
	 * To ovveride this function you can pass the variables and arrays used for each 
	 * algorithm and add them with the function push() in the algorithm_steps array
	 * You can access each element of the array using the step index and the key fields of the array
	 * Add new key fields for new variables pass to the function
	 *
	 * Note: to access the step with number stepIndex of the algorithm use as index of the array the stepIndex - 1
	 * We do this because the array starts from index 0 and not 1
	 * For example step 4 of algorithm is: algorithmSteps[3]
	 * For example step 1 of algorithm is: algorithmSteps[2]
	 */  	
	function save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps ){
		
		algorithmSteps.push({
			"stepIndex": stepIndex, 
			"stackStep": stack, 
			"outputStep": outputArray, 
			"stateStep": state, 
			"childrenStep": children
		});
	}
	
	/*!
	 * print_arrays - Function
	 *
	 * This is the function that displays the arrays used in each algorithm step
	 *
	 * int stepIndex - the current step of the algorithm
	 * array algorithmSteps - array with all the steps of the algorithm
	 * 
	 * Because we store the node ids in the algorithm steps 
	 * we use the helper function print_labels() to display the labels of the node ids
	 * we can access all the labels of the nodes of the graph from nodes.get() function
	 *
	 * To ovveride this function you can get different DOM elements from the html
	 * by specifing an html DOM id and use the function innerHTML to add the field of the step
	 * you want to display
	 *
	 * So while the algorithm is running we can use the function print_arrays(stepIndex, algorithmSteps )
	 * and display the values of the arrays stored in the algorithmSteps for the current step (stepIndex)
	 *
	 * Note: use this function after the function save_algorithmSteps() beacuse we use the algorithmSteps
	 * array to print each step
	 */  	
	function print_arrays(stepIndex, algorithmSteps  ){
			
		//get all nodes of the graph	
		var all_nodes = nodes.get();
		
	
		//display the stack array
		div = document.getElementById('stack-status');
		div.innerHTML = print_labels( algorithmSteps[stepIndex-1].stackStep );
		
		//display the output array
		div = document.getElementById('visited-status');
		div.innerHTML = print_labels( algorithmSteps[stepIndex-1].outputStep );


		//display the state
		div = document.getElementById('state-array');
		if ( algorithmSteps[stepIndex-1].stateStep ){
			div.innerHTML =  all_nodes[ algorithmSteps[stepIndex-1].stateStep -1].label ;
			
		}
		else {
			div.innerHTML = '-';
		}
		
	
		//display the children
		div = document.getElementById('children-array');
		if ( algorithmSteps[stepIndex-1].childrenStep.length == 0 ){
			div.innerHTML = 'ΒΡΟΧΟΣ';
		}
		else {
			div.innerHTML = print_labels( algorithmSteps[stepIndex-1].childrenStep );
		}	
		
	}
	
	/*!
	 * print_algorithm_steps - Function
	 *
	 * This is the function that displays each algorithm step
	 *
	 * int stepIndex - the current step of the algorithm
	 * array algorithmSteps - array with all the steps of the algorithm
	 * 
	 * Because we store the node ids in the algorithm steps 
	 * we can access all the labels of the nodes of the graph from nodes.get() function
	 * Depending on which algorithm step we are and the values of correspondind element
	 * in the algorithmSteps array we create the algorithm description
	 * we want to display (var message) and we print it to the UI with the function innerHTML
	 *
	 *
	 * Note: use this function after the function save_algorithmSteps() beacuse we use the algorithmSteps
	 * array to print each step
	 */  	
	function print_algorithm_steps( stepIndex, algorithmSteps ){
		
		var all_nodes = nodes.get();
		div = document.getElementById('step');
		div.innerHTML = 'Step: '+stepIndex;
		
		
		var div = document.getElementById('main-timeline');
		var tvalue = stepIndex % 2;
		
		
		if( stepIndex > 1){
			
			var message = 'Προσθέτουμε τον κόμβο: '+all_nodes[ algorithmSteps[stepIndex -2].stateStep -1 ].label+ '  στο κλειστό σύνολο.';

			if( algorithmSteps[stepIndex -2].childrenStep.length > 0){
				message =  message + 'Στη συνέχεια προστίθενται τα παιδιά της κατάστασης: '+ print_labels( algorithmSteps[stepIndex -2].childrenStep )+' στο μέτωπο αναζήτησης.';
			}
			else {
				message =  message + 'Ο κόμβος '+all_nodes[ algorithmSteps[stepIndex -2].stateStep -1 ].label+ ' δεν έχει παιδιά που δεν έχει επισκεφθεί ο αλγόριθμος.';
			}
			
			
			if( algorithmSteps[stepIndex -1].stateStep ){
				message = message + 'Ο κόμβος '+ all_nodes[ algorithmSteps[stepIndex -1].stateStep -1 ].label + ' είναι πλέον η κατάσταση του αλγορίθμου.';
			}
			
			if( algorithmSteps[stepIndex -1].stackStep.length == 0 ){
				message = message + 'Το μέτωπο αναζήτησης είναι κενό, συνεπώς ο αλγόριθμος τερματίζεται.'
			}
			
			var tooltip = 'test';
		}
		else {
			
			var message = 'Ο κόμβος '+ all_nodes[ algorithmSteps[stepIndex -1].stateStep -1 ].label+ ' είναι η ρίζα οπότε προστίθεται στο μέτωπο αναζήτησης.';
			var tooltip = 'test';
			
		}
		
		
		div.innerHTML = div.innerHTML + '<a href="#!" id="'+stepIndex+'" class="collection-item tooltipped" data-position="left" data-tooltip="Kάνε κλικ για να δείς το βήμα του αλγορίθμου."><i class="material-icons expand-icon " >expand_more</i><span id="badge'+stepIndex+'" class="new badge left">'+stepIndex+'</span><div class="">'+ message + '</div><div class="hide info">'+tooltip+'</div></a>';
		
		window.scrollBy(0,document.body.scrollHeight);
		jQuery('.collection-item.tooltipped').tooltip({delay: 20});
		
	}
		

	/*!
	 * mark_nodes - Function
	 *
	 * This is the function that marks the nodes on each step
	 *
	 * int stepIndex - the current step of the algorithm
	 * array algorithmSteps - array with all the steps of the algorithm
	 * 
	 * We add different colors to the nodes by using the function update()
	 * in which we pass the name of the group corresponding to a specific color
	 * The colors are declared in the groups which are specified 
	 * in the file initialize.js function createNetwork()
	 * The function update() updates the data of the nodes array 
	 * and the function redraw() actually is coloring the graph
	 *
	 * You can override this function by adding different groups in the createNetwork() function
	 * and then pass to the function nodes.update()
	 *
	 * Note: use this function after the function save_algorithmSteps() beacuse we use the algorithmSteps
	 * array to print each step
	 */  	
	function mark_nodes( stepIndex, algorithmSteps  ){

			var previousChildren = algorithmSteps[ stepIndex - 1].childrenStep;
				
			if( previousChildren.length > 0 ){
				previousChildren.forEach(function(ID) {
					nodes.update({ id: ID, group: 'added', title: 'Ο κόμβος θα προστεθεί στο μέτωπο αναζήτησης' });
					network.selectNodes([ID],true);
				});
			}
			
			var output = algorithmSteps[stepIndex-1].outputStep
			if ( output ){
				output.forEach(function(ID) {
					nodes.update({ id: ID, group: 'visited', title: 'Ο κόμβος ανήκει στο Κλειστό Σύνολο' });
				});
			}
			
			var state = algorithmSteps[stepIndex-1].stateStep;
			if ( state ){
				nodes.update({ id: state, group: 'active', title: 'Κόμβος - Kατάσταση' });
				network.selectNodes([state],true);
			}
			
			
			network.redraw(); 	
	}
	

	/*!
	 * showAlgorStep - Function
	 *
	 * This is the function that displays the algorithm step the user clicked to view
	 *
	 * int stepIndex - the step of the algorithm the user clicked
	 * 
	 * At the point the user can view a specific step of the algorithm
	 * all the steps have been saved beacause the algorithm s terminated
	 * so by passing the stepIndex we can access the elements of each step
	 * and pass them to the functions used for the algorithm print_arrays() and mark_nodes()
	 *
	 *
	 * Note: The first 3 lines of code below are used to redraw the graph to its original colors
	 * so that there are not bugs when marking the nodes.
	 */  			
	function showAlgorStep( stepIndex ){
		  
		var all_nodes = nodes.get();
		all_nodes.forEach(function(node) {
			nodes.update({ id: node.id, group: 'normal', title: 'Normal' });
		});
		
		div = document.getElementById('step');
		div.innerHTML = 'Step: '+stepIndex;
		
		print_arrays( stepIndex,algorithmSteps );
		mark_nodes( stepIndex, algorithmSteps );
	}
		
		
		
	/*!
	 * steps_table - Function
	 *
	 * This is the function that displays all the steps of the algorithm after executed
	 *
	 * int stepIndex - the current step of the algorithm
	 * array algorithmSteps - array with all the steps of the algorithm
	 * 
	 * This function is executed as the last function of each search algorithm to print all the steps
	 * of the algorithm the user executed
	 *
	 * Note: use this function only at the end of the algorithm
	 */  		
	function steps_table( stepIndex, algorithmSteps  ) {
		
		var all_nodes = nodes.get();
		var state_step,children_step;
		
		//for each step of the array algorithmSteps
		algorithmSteps.forEach(function(step) {
			
			if ( step.stateStep ){
				state_step =  all_nodes[ step.stateStep -1].label ;
				
			}
			else {
				state_step = '-';
			}
			
			if ( step.childrenStep.length == 0 ){
				children_step = 'ΒΡΟΧΟΣ';
				
			}
			else {
				children_step =  print_labels(step.childrenStep);		
			}
		
			//add the step to the table
			$('#all-steps-panel table tr:last').after('<tr><td>['+print_labels(step.stackStep)+']</td><td>['+print_labels(step.outputStep)+']</td><td>'+state_step+'</td><td>['+children_step+']</td></tr>');
			
		});
	 
		div = document.getElementById('output-stack');
		div.innerHTML = print_labels( algorithmSteps[stepIndex-1].outputStep );
	}



	/*!
	 * removeA - Function
	 *
	 * Helper function to remove element from an array.Used for DFS algorithm
	 *
	 */  	
	function removeA(arr) {
		var what, a = arguments, L = a.length, ax;
		while (L > 1 && arr.length) {
			what = a[--L];
			while ((ax= arr.indexOf(what)) !== -1) {
				arr.splice(ax, 1);
			}
		}
		return arr;
	}
	
	
	/*!
	 * print_labels - Function
	 *
	 * Helper function to print the node labels of the arrayIDs
	 *
	 * array arrayIDs - array of the node ids we want to print the labels for
	 *
	 */  	
	function print_labels( arrayIDs ){
		
		var all_nodes = nodes.get();
		var print_stack = [];
		
		if( arrayIDs && arrayIDs.length > 0 ){
			
			arrayIDs.forEach(function(ID) {
				print_stack.push( all_nodes[ID-1].label );
			});
		}
		else {
			print_stack = '-';
		}
		
		return print_stack;
		
	}
		