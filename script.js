var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();
    
    Trello.members.get("me", function(member){
        $("#fullName").text(member.fullName);
    
        var $cards= $("<div>")
            .text("Loading Cards...")
            .appendTo("#output");

        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get("members/me/cards", function(cards) {
            $cards.empty();
            $("<div>").text("Click a card to add a comment to it").appendTo($cards);
            
            $.each(cards, function(ix, card) {
                $("<a>")
                .addClass("card")
                .text(card.name)
                .appendTo($cards)
                .click(function(){
                    Trello.post("cards/" + card.id + "/actions/comments", { text: "Hello from Custom Application" })
                })
            });  
        });
    });

};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);        
};
    
var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};
                          
Trello.authorize({
    interactive:false,
    success: onAuthorize
});


//on dom load

(function(){
	$("#connectLink").click(function(){		
	    Trello.authorize({
	        type: "popup",
	        success: onAuthorize,
	        scope: { write: true, read: true }
	    })
	});
	    
	$("#disconnect").click(logout);
})();