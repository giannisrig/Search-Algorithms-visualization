 /*!
 * ALL
 *
 */  
var all_letters = [
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
	{id: '12', label: 'L', group: 'normal'},
	{id: '13', label: 'M', group: 'normal'},
	{id: '14', label: 'N', group: 'normal'},
	{id: '15', label: '0', group: 'normal'},
	{id: '16', label: 'P', group: 'normal'},
	{id: '17', label: 'Q', group: 'normal'},
	{id: '18', label: 'R', group: 'normal'},
	{id: '19', label: 'S', group: 'normal'},
	{id: '20', label: 'T', group: 'normal'},
	{id: '21', label: 'U', group: 'normal'},
	{id: '22', label: 'V', group: 'normal'},
	{id: '24', label: 'W', group: 'normal'},
	{id: '25', label: 'X', group: 'normal'},
	{id: '26', label: 'Y', group: 'normal'},
	{id: '27', label: 'Z', group: 'normal'},
 ];
 
		 
		 
		 
 /*!
 * Example 1
 *
 */ 	
var example_1_nodes = [
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
	{id: '12', label: 'L', group: 'normal'},

 ];
  var example_1_edges = [
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
 ];		 
		 
 /*!
 * Example 2
 *
 */ 	
var example_2_nodes = [
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
	{id: '12', label: 'L', group: 'normal'},

 ];
  var example_2_edges = [
	{id: "1", from: "1", to: "2"},
	{id: "2", from: "1", to: "7"},
	{id: "3", from: "1", to: "8"},
	{id: "4", from: "2", to: "3"},
	{id: "5", from: "2", to: "6"},
	{id: "6", from: "3", to: "4"},
	{id: "7", from: "3", to: "5"},	
	{id: "8", from: "8", to: "9"},
	{id: "9", from: "8", to: "12"},
	{id: "10", from: "9", to: "10"},
	{id: "11", from: "9", to: "11"},
	
 ];
 
 
 /*!
 * Example 3
 *
 */ 
 
 var example_3_nodes = [
	{id: '1', label: 'A', group: 'normal'},
	{id: '2', label: 'S', group: 'normal'},
	{id: '3', label: 'B', group: 'normal'},
	{id: '4', label: 'H', group: 'normal'},
	{id: '5', label: 'C', group: 'normal'},
	{id: '6', label: 'E', group: 'normal'},
	{id: '7', label: 'D', group: 'normal'},
	{id: '8', label: 'F', group: 'normal'},
	{id: '9', label: 'G', group: 'normal'},
	{id: '10', label: 'I', group: 'normal'}

 ];
  var example_3_edges = [
	{id: "1", from: "1", to: "2"},
	{id: "2", from: "1", to: "3"},
	{id: "3", from: "6", to: "4"},
	{id: "4", from: "2", to: "5"},
	{id: "5", from: "5", to: "6"},
	{id: "6", from: "5", to: "7"},
	{id: "7", from: "8", to: "5"},
	{id: "8", from: "2", to: "9"},
	{id: "9", from: "9", to: "8"},
	{id: "10",from: "9", to: "4"},
	{id: "11",from: "9", to: "10"}
 ];