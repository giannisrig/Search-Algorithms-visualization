	  //Initialize variables to use for every algorithm
	 var algorithmSteps= [];
	  
	  //=================================================
	  // Depth First Search - DFS ALGORITHM
	  //=================================================	
		function dfs(){
			$( ".dn-right-panel .tabs .tab:first-child a" ).trigger( "click" );
		    var nodeS = nodes.get();                            //all nodes of graph
			var stackStatus=[];                                 //stack Status
		    var output=[]; 
	        var visited=[];                                     //visited nodes
			var child;                                          //id of the next unvisited child (-1 if there isn't any)
			var stepcounter =  1;                               //count each step of the algorithm
			var secondsCount = secINC;                          //counter for seconds to display results
			
			
			emptyData();
			stackStatus.push(nodeS[0].id);                      //add the start node id to the Stack
			visited.push(nodeS[0].label);                       //add the node to the 'visited' nodes
			output.push(nodeS[0].label);                        //add the node's label to the output	
			mark(nodeS[0].id);                                  //mark the Starting Node
		    var nodid = nodeS[0].id;	                        //nodid to show on printStack method
			printStack(nodid,nodeS,0,secondsCount);		    //Print the output stack			
			printStack(nodid,nodeS,1,secondsCount);
			printStack(nodid,nodeS,2,secondsCount);
			
			while(stackStatus.length!=0){
			
				//get the top value of the stack	
				var v = stackStatus[stackStatus.length-1];   			
				child = -1;			
				
				//get node's connected nodes
				adjList = network.getConnectedNodes(v);      
				
				//define the message of the step
                var msg = 'Node <span class="node-label">'+nodeS[v-1].label+'</span> is the active node.<span class="node-label">'+nodeS[v-1].label+'</span> is connected to: ';
				
				//define the tooltip of the step
				var tooltip = 'Since node <span class="node-label">'+ nodeS[v-1].label +'</span> is the last element of the stack it is the active node so we will continue by inserting its unvisited connected nodes.'
				
				//get the connected nodes of the current active node - nodeS[v-1]
				for (var i=0; i<adjList.length; i++){
					
					u=adjList[i];
					msg = msg + '<span class="node-label">'+ nodeS[u-1].label+'</span>, ';
					
					//if child is unvisited
					if(visited.indexOf(nodeS[u-1].label) == -1){   
					   
					   if(child == -1){
					     child = u;
					   }
					   else{
					     var str = nodeS[u-1].label;
						 var str2 = nodeS[child-1].label;
						 var n = str.localeCompare(str2); 
							 if (n == -1){
							    child = u;
							 }
					   }//End else
					   
					}//End if
					
				}//End For
               
			   //mark the active node
 			    markAct(v,secondsCount); 
				
				//print the step to timeline-badge
				printSteps(msg,stepcounter,'success',secondsCount,tooltip);    
				
				//select the current active node
				saveSteps(0,steps,secondsCount,v,v);
				selectNode(v,secondsCount);                   

				//increment the step counter				
				stepcounter++;	                                                  
				secondsCount = secondsCount + secINC;                             
				
				//if the active node has an unvisited child
				if(child > -1){        
				
			        stackStatus.push(nodeS[child-1].id);                          //add the node's id to the Stack Status
     			    visited.push(nodeS[child-1].label);                           //add the node to the 'visited' nodes
			        output.push(nodeS[child-1].label);                            //add the node's label to the output				
                    mark(nodeS[child-1].id,secondsCount);                         //mark the node's child as visited
					selectNode(nodeS[child-1].id,secondsCount);                   //select the node's child
					
				    var msg = 'Inserting Node <span class="node-label">'+ nodeS[child-1].label + '</span> to Stack and mark it as visited';
					
					//define the tooltip of the step
					var tooltip = 'Because node <span class="node-label">'+ nodeS[child-1].label +'</span> is first unvisited connected node of node <span class="node-label">'+ nodeS[v-1].label + '</span> we insert it in the Stack and also mark it us visited.'
					
					printSteps(msg,stepcounter,'warning',secondsCount,tooltip);			  //print the step to timeline-badge			
				    nodid =  nodeS[child-1].id;					
                    printStack(nodid,nodeS,0,secondsCount);		                  //Update the Output Stack
                    printStack(nodid,nodeS,1,secondsCount);                       //Update the Output Stack
                    printStack(nodid,nodeS,2,secondsCount);		                   //Update the Output Stack
					saveSteps(1,steps,secondsCount,nodeS[child-1].id,v);	          //Save Step
                    secondsCount = secondsCount + secINC;						  //increment the seconds counter by 1sec
					stepcounter++;		                                          //increment the step counter	
				}
				else{
				    var g = stackStatus.pop();                                     //pop the latest node from Stack Status
					var msg = 'Node <span class="node-label">'+ nodeS[g-1].label +'</span> has 0 unvisited connected nodes and has been poped from the Stack';
					
					var tooltip = 'Because the node <span class="node-label">'+ nodeS[g-1].label +'</span> has no unvisited nodes we remove it from the Stack and continue with the next last node of the array.'
					
					
					printSteps(msg,stepcounter,'danger',secondsCount,tooltip);
					
					markDel(nodeS[g-1].id,secondsCount);
					printStack(nodid,nodeS,3,secondsCount);
					saveSteps(2,steps,secondsCount,nodeS[g-1].id,v);
					secondsCount = secondsCount + secINC;
					mark(nodeS[g-1].id,secondsCount);
					
		            stepcounter++;		                                   //increment the step counter	
				}
				//alert(stackStatus);
			}
			
			var msg = 'Stack is empty so the algorithm ends.';
					
			//more info of the step
			var tooltip = 'When the Stack is empty the bfs algorithm terminates.You can view the final result of the algorithm at the output array.';
		
			//print the step to timeline-badge			
			printSteps(msg,stepcounter,'warning',secondsCount,tooltip);			  
			saveSteps(0,steps,secondsCount,v,v);	                    
			secondsCount = secondsCount + secINC;			

	   }//End Function
	   
	   
	   
	  //=================================================
	  // Breadth First Search - BFS ALGORITHM
	  //=================================================	
		function bfs(){
			$( ".dn-right-panel .tabs .tab:first-child a" ).trigger( "click" );
            var nodeS = nodes.get();                                          //all nodes of graph       
		
			var queue = [];                                                   //queue for BFS
			var queueLabels = [];                                             //for print stack method
			var output=[];                                                    //output of BFS
			var visited=[];                                                   //visited nodes			
			var temp = [];                                                    //temp array
			var stepcounter =  1;                                             //count each step of the algorithm
			var secondsCount = secINC;                                        //counter for seconds to display results
			var last_active;
			
			emptyData();
			last_active = nodeS[0].id;
			queue.push(nodeS[0].id);                                          //add the start node id to the Stack
			queueLabels.push(nodeS[0].label);
			visited.push(nodeS[0].label);                                     //add the node to the 'visited' nodes
			output.push(nodeS[0].label);                                      //add the node's label to the output	
			
			mark(nodeS[0].id);                                                //mark the Starting Node
		    var msg = 'Node <span class="node-label">'+ nodeS[0].label + '</span> is the root Node so we insert it to the queue mark it as visited';
			var tooltip = 'Node <span class="node-label">'+nodeS[0].label+'</span> is the root node of the graph so it is the first node we insert to the queue and mark it as visited.';
				
			printSteps(msg,stepcounter,'warning',secondsCount,tooltip);		          //print the step
			
			var nodid = nodeS[0].id;	                                      //node id to show on printStack method
			printStack(nodid,nodeS,0,secondsCount);		                      //Print the output stack			
            printStack(nodid,nodeS,1,secondsCount);
			printStack(nodid,nodeS,2,secondsCount);                           //Print the Visited Stack
			saveSteps(1,steps,secondsCount,nodeS[0].id,-1);                      //save steps
			selectNode(nodeS[0].id,secondsCount);                             //select the current active node
			stepcounter++;	                                                  //increment the step counter
			secondsCount = secondsCount + secINC;                             //increment the seconds counter by 1sec
			
			while(queue.length!=0){                                           //While the queue is not empty
			
				
				var v = queue.shift();                                        //get the first value of the queue	
                queueLabels.shift();				                          //remove the label from the labels queue
				
				
				var adjList = network.getConnectedNodes(v);                   //get node's connected nodes
				
                var msg = 'Node <span class="node-label">'+nodeS[v-1].label+'</span> is popped and is the active node.<span class="node-label">'+nodeS[v-1].label+'</span> is connected to: ';
				
				if ( v != last_active ){
					var tooltip = 'Node <span class="node-label">'+nodeS[last_active-1].label+'</span> has no unvisited nodes so we continue with Node <span class="node-label">'+nodeS[v-1].label+'</span> which is the first element of  the queue so we remove it from the queue and set it as the active node.We will continue by searching and inserting its unvisited connected nodes';
				
				}
				else {
					var tooltip = 'Node <span class="node-label">'+nodeS[v-1].label+'</span> which is the first element of  the queue so we remove it from the queue and set it as the active node.We will continue by searching and inserting its unvisited connected nodes';
				}
				
				for (var i=0; i<adjList.length; i++){
					u=adjList[i];
					msg = msg + '<span class="node-label">'+ nodeS[u-1].label+'</span>, ';
					
					if(visited.indexOf(nodeS[u-1].label) == -1){              //if child of current active node is unvisited
                        temp.push([nodeS[u-1].label,nodeS[u-1].id]);          //push it to the temp queue						
					}//End if
					
				}//End For
			
					printSteps(msg,stepcounter,'danger',secondsCount,tooltip);
					
					markAct(nodeS[v-1].id,secondsCount);
					printStack(nodid,nodeS,4,secondsCount);
					saveSteps(4,steps,secondsCount,nodeS[v-1].id,v);
					secondsCount = secondsCount + secINC;
					mark(nodeS[v-1].id,secondsCount);
					
		            stepcounter++;		            
					
					
					
				
				temp.sort(sortFunction);

				while(temp.length!=0){
					var item = temp.shift();
					queue.push(item[1]);
					queueLabels.push(item[0]);
					visited.push(item[0]);                                        //mark it as visited
			        output.push(item[0]);                                         //add it to the algorithms output	
					
					//var for the step text
					var msg = 'Inserting Node <span class="node-label">'+ item[0] + '</span> to Queue and mark it as visited';
					
					//more info of the step
					var tooltip = 'Node <span class="node-label">'+ item[0] +'</span> is connected to the active node <span class="node-label">'+ nodeS[v-1].label +'</span> so we insert it into the queue and mark it as visited.';
				
					//print the step to timeline-badge			
					printSteps(msg,stepcounter,'warning',secondsCount,tooltip);			  
				    nodid =  item[1];					
                    printStack(nodid,nodeS,0,secondsCount);		                  //Update the Output Stack
                    printStack(nodid,nodeS,1,secondsCount);
                    printStack(nodid,nodeS,2,secondsCount);		                  //Update the Visited Stack
					saveSteps(1,steps,secondsCount,item[1],v);	                  //Save Step
                    secondsCount = secondsCount + secINC;						  //increment the seconds counter by 1sec
					stepcounter++;		                                          //increment the step counter	
				}
				
				last_active = v;
				
			}//End While
			
			
			var msg = 'Queue is empty so the algorithm ends.';
					
			//more info of the step
			var tooltip = 'When the Queue is empty the bfs algorithm terminates.You can view the final result of the algorithm at the output array.';
		
			//print the step to timeline-badge			
			printSteps(msg,stepcounter,'warning',secondsCount,tooltip);			  
			saveSteps(0,steps,secondsCount,v,v);	                    
			secondsCount = secondsCount + secINC;			

			
			stepcounter++;		
	
	   }//End Function
	   
		function sortFunction(a, b) {
				if (a[0] === b[0]) {
					return 0;
				}
				else {
					return (a[0] < b[0]) ? -1 : 1;
				}
			}
	   
	  //=================================================
	  //    ShowStep()
	  //=================================================	
	   function showStep(ID){
	    	  
		
			  for (var j=0; j<nodes.length; j++){//Redraw network to normal
			      nodes.update({ id: j+1, group: 'normal', title: 'normal' });
			      network.redraw();
			   }
			   
			   var index = ID-1;
			   
			  //Get the 'output', 'Stack Status' and 'Visited Stack' of step 'ID' and print them to screen
		      $('#output-stack').html(steps[index].output);
			  $('#step').html('Step: '+ID);
			  $('#stack-status').html(steps[index].stackstatus);
			  $('#visited-status').html(steps[index].visitedstatus);
	        
			  //for each node in visited stack mark it as visited	
		      for (var i=0; i<ID; i++){
				   var visited = steps[i].visited;
				   if(isNaN(visited.substring(visited.length-3,visited.length-2))){//ean to len-3,len-2 den einai arithmos diladi einai komma
				     var node = visited.substring(visited.length-2,visited.length-1);
				   }
				   else{
				     var node = visited.substring(visited.length-3,visited.length-1);
				   }
				     
				   //alert('Node id: '+node);
				   nodes.update({ id: node, group: 'visited', title: 'visited' });
				   network.redraw();
			   } 
			   			
               //alert('Type: '+steps[ID-1].type+' Stack: '+steps[ID-1].stack+' Select: '+steps[ID-1].last);
			   switch (steps[ID-1].type) {
			        case 0: 
                        nodes.update({ id: steps[ID-1].last, group: 'active', title: 'Active' });
			            network.redraw();					
						network.selectNodes([steps[ID-1].last],true);
						
						
						
						$('#stack-status').parent().removeClass().addClass('collection-item black-text');
					break;
					
					case 1:
					
						if ( steps[ID-1].active != -1 ){
							nodes.update({ id: steps[ID-1].active, group: 'active', title: 'Active' });
							network.redraw();
							
						}
						
						// var edges_ids = get_edges_ids(steps[ID-1].active);
						// console.log(edges_ids);
						
						network.selectNodes([steps[ID-1].last],false);
						// network.selectEdges(edges_ids);
						$('#stack-status').parent().removeClass().addClass('collection-item green-text');
					break;
					
					case 2:
						nodes.update({ id: steps[ID-1].last, group: 'deleted', title: 'Deleted' });
			            network.redraw();
						network.selectNodes([steps[ID-1].last],false);
						$('#stack-status').parent().removeClass().addClass('collection-item red-text');
					break;
			   
					case 4:
						nodes.update({ id: steps[ID-1].last, group: 'active', title: 'active' });
			            network.redraw();
						
					
						network.selectNodes([steps[ID-1].last],true);
						$('#stack-status').parent().removeClass().addClass('collection-item red-text');
					break;
			   
			   }
        }
		
		
	
	  //=================================================
	  //    mark()
	  //=================================================
	   function mark(ID,secondsCount){
		   setTimeout(function(){ 
			   nodes.update({ id: ID, group: 'visited', title: 'Visited' });
			   network.redraw(); 
		   }, secondsCount);
	    }
		
		
	  //=================================================
	  //    markDel()
	  //=================================================
		function markDel(ID,secondsCount){
		   setTimeout(function(){ 
			   nodes.update({ id: ID, group: 'deleted', title: 'Visited' });
			   network.redraw(); 
		   }, secondsCount);
	    }
		
	  //=================================================
	  //    markAct()
	  //=================================================
		function markAct(ID,secondsCount){
		   setTimeout(function(){ 
			   nodes.update({ id: ID, group: 'active', title: 'Active' });
			   network.redraw(); 
		   }, secondsCount);
	    }
		
		function markActBFS(ID,secondsCount){
		   setTimeout(function(){ 
			   nodes.update({ id: ID, group: 'active', title: 'Active' });
			   network.redraw(); 
		   }, secondsCount);
	    }
		
	  //=================================================
	  //    printSteps()
	  //=================================================		
		function printSteps(message,stepcounter,type,secondsCount, tooltip = ''){
			
			setTimeout(function(){
				
				div = document.getElementById('step');
			    div.innerHTML = 'Step: '+stepcounter;
				
				var div = document.getElementById('main-timeline');
				var tvalue = stepcounter % 2;
				
				
					div.innerHTML = div.innerHTML + '<a href="#!" id="'+stepcounter+'" class="collection-item tooltipped" data-position="left" data-tooltip="Click to view the current step.Click to get an explanation of the step."><i class="material-icons expand-icon " >expand_more</i><span id="badge'+stepcounter+'" class="new badge left">'+stepcounter+'</span><div class="">'+ message + '</div><div class="hide info">'+tooltip+'</div></a>';
				
				window.scrollBy(0,document.body.scrollHeight);
				jQuery('.collection-item.tooltipped').tooltip({delay: 20});
				
			 }, secondsCount); 
		}
		
		
	  //=================================================
	  //    saveSteps()
	  //=================================================
		function saveSteps(type,steps,secondsCount,lastNode, activeNode){
			setTimeout(function(){
			   var out = document.getElementById('output-stack').innerHTML;
			   var stack = document.getElementById('stack-status').innerHTML;
			   var visited = document.getElementById('visited-status').innerHTML;
			   var vis = document.getElementById('vs').innerHTML;
			   steps.push({"type": type, "output": out, "stackstatus":stack, "visitedstatus":visited, "visited": vis, "last": lastNode, "active": activeNode});
			   return steps;
			}, secondsCount);
		}
		
	  //=================================================
	  //    printStack()
	  //=================================================
		function printStack(id,nodeS,type,secondsCount){
			setTimeout(function(){
			nodid =  nodeS[id-1].label + ',';	
			if(type == 0){
				div = document.getElementById('output-stack');
				div.innerHTML = div.innerHTML + nodid;
			}
            else if	(type == 1){
			    div = document.getElementById('stack-status');
				div.innerHTML = div.innerHTML + nodid;
			}
            else if (type == 2){
				div = document.getElementById('visited-status');
				div.innerHTML = div.innerHTML + nodid;
				div = document.getElementById('vs');
				div.innerHTML = div.innerHTML + nodeS[id-1].id + ',';
			}
            else if (type == 3){
                div = document.getElementById('stack-status').innerHTML;
				div = div.substring(0, div.length-2);
				div2 = document.getElementById('stack-status');
				div2.innerHTML = div; 
			}
            else if (type == 4){
                div = document.getElementById('stack-status').innerHTML;
				div = div.substring(2, div.length);
				div2 = document.getElementById('stack-status');
				div2.innerHTML = div; 
			}			
			 }, secondsCount);
			 
		}
		
		
	  //=================================================
	  //    selectNode()
	  //=================================================
		function selectNode(ID,secondsCount){
		  setTimeout(function(){ 
				network.selectNodes([ID],false);
				}, secondsCount);
		}
		
		
			
	  //=================================================
	  //    selectNode()
	  //=================================================
		function get_edges_ids(v){
		 		adjList = network.getConnectedEdges(v);      //get node's connected nodes
				
				
				return adjList;
		}
		
		
		
		
		
//=================================================
//    NEW VERSION
//=================================================	
		
		
		
		
		async function dfsNew(){
			
			//define arrays and vars to be used
		    var all_nodes = nodes.get();     
			var	stepIndex = 1;		
			var stack = [];
			var outputArray = [];
			var state;
			var	children = [];
			var secondsCount = 100;    

			
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
					
					
					save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
					print_arrays( stepIndex,algorithmSteps );
					print_algorithm_steps(stepIndex,algorithmSteps );
					mark_nodes( stepIndex, algorithmSteps );
				
				}
			
				
			}
			return false;
			
		}
		
		async function bfsNew(){
			
			//define arrays and vars to be used
		    var all_nodes = nodes.get();     
			var	stepIndex = 1;		
			var stack = [];
			var outputArray = [];
			var state;
			var	children = [];
			var secondsCount = 100;    
			
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

				// arrays stuff
				//
							
				outputArray = outputArray.concat(state);	
				stack = stack.concat(children);	
				stack.shift();
				state = stack[0];	
				children = network.getConnectedNodes( state );  				
				
				//children fix
				for (var i=0; i < outputArray.length; i++){
					removeA( children, outputArray[i]);
				}
               
				// save print and mark steps
				save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps );
				print_arrays( stepIndex,algorithmSteps );
				print_algorithm_steps(stepIndex,algorithmSteps );
				mark_nodes( stepIndex, algorithmSteps );
			  
				
			}
			// console.log( algorithmSteps);
			
			return false;
			
		}
		
		function sleep(ms) {
		  return new Promise(resolve => setTimeout(resolve, ms));
		}

			
		function save_algorithmSteps( stepIndex, stack, outputArray, state, children, algorithmSteps ){
			
			algorithmSteps.push({
				"stepIndex": stepIndex, 
				"stackStep": stack, 
				"outputStep": outputArray, 
				"stateStep": state, 
				"childrenStep": children
			});
		}
		
		function print_arrays(stepIndex, algorithmSteps  ){
				
			var all_nodes = nodes.get();
		
			div = document.getElementById('stack-status');
			div.innerHTML = print_labels( algorithmSteps[stepIndex-1].stackStep );
			
			
			div = document.getElementById('visited-status');
			div.innerHTML = print_labels( algorithmSteps[stepIndex-1].outputStep );
	
			div = document.getElementById('state-array');
			if ( algorithmSteps[stepIndex-1].stateStep ){
				div.innerHTML =  all_nodes[ algorithmSteps[stepIndex-1].stateStep -1].label ;
				
			}
			else {
				div.innerHTML = '-';
			}
		
			div = document.getElementById('children-array');
			if ( algorithmSteps[stepIndex-1].childrenStep.length == 0 ){
				div.innerHTML = 'LOOP';
			}
			else {
				div.innerHTML = print_labels( algorithmSteps[stepIndex-1].childrenStep );
			}	
		}
		
		function print_algorithm_steps(stepIndex, algorithmSteps  ){
			
			var all_nodes = nodes.get();
			div = document.getElementById('step');
			div.innerHTML = 'Step: '+stepIndex;
			
			
			
			var div = document.getElementById('main-timeline');
			var tvalue = stepIndex % 2;
			
			
			if( stepIndex > 1){
				
				var message = 'We mark node '+all_nodes[ algorithmSteps[stepIndex -2].stateStep -1 ].label+ ' as visited and we add its children '+ print_labels( algorithmSteps[stepIndex -2].childrenStep )+' to the Queue.';
				
				if( algorithmSteps[stepIndex -1].stateStep ){
					message = message + 'Node '+ all_nodes[ algorithmSteps[stepIndex -1].stateStep -1 ].label + ' is the active state node now.';
				}
				
				if( algorithmSteps[stepIndex -1].stackStep.length == 0 ){
					message = message + 'Stack is empty so the algorithm is terminated.'
				}
				
				var tooltip = 'test';
			}
			else {
				var message = 'Node '+ all_nodes[ algorithmSteps[stepIndex -1].stateStep -1 ].label+ ' is the root node so we add it to the Queue';
				var tooltip = 'test';
			}
			
			
			div.innerHTML = div.innerHTML + '<a href="#!" id="'+stepIndex+'" class="collection-item tooltipped" data-position="left" data-tooltip="Click to view the current step.Click to get an explanation of the step."><i class="material-icons expand-icon " >expand_more</i><span id="badge'+stepIndex+'" class="new badge left">'+stepIndex+'</span><div class="">'+ message + '</div><div class="hide info">'+tooltip+'</div></a>';
			
			window.scrollBy(0,document.body.scrollHeight);
			jQuery('.collection-item.tooltipped').tooltip({delay: 20});
			
		}
			

		
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
			
		
		function mark_nodes( stepIndex, algorithmSteps  ){

				var previousChildren = algorithmSteps[ stepIndex - 1].childrenStep;
					
				if( previousChildren.length > 0 ){
					previousChildren.forEach(function(ID) {
						nodes.update({ id: ID, group: 'added', title: 'Added' });
						network.selectNodes([ID],true);
					});
				}
				
				var output = algorithmSteps[stepIndex-1].outputStep
				if ( output ){
					output.forEach(function(ID) {
						nodes.update({ id: ID, group: 'visited', title: 'Visited' });
					});
				}
				
				var state = algorithmSteps[stepIndex-1].stateStep;
				if ( state ){
					nodes.update({ id: state, group: 'active', title: 'Active' });
					network.selectNodes([state],true);
				}
				
				
			    network.redraw(); 	
		}
		
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
		
		
		function print_labels( arrayIDs ){
			
			var all_nodes = nodes.get();
			var print_stack = [];
			
			if( arrayIDs && arrayIDs.length > 0 ){
				
				arrayIDs.forEach(function(ID) {
					print_stack.push( all_nodes[ID-1].label );
				});
			}
			
			return print_stack;
			
		}
			