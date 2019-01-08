/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.1
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts) {
    opts = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 10,
        current_page: 0,
        num_edge_entries: 0,
        link_to: "#",
        prev_text: "Prev",
        next_text: "Next",
        ellipse_text: "...",
        prev_show_always: true,
        next_show_always: true,
        callback: function() { return false; }
    }, opts || {});

    return this.each(function() {
        /**
        * Calculate the maximum number of pages
        */
        function numPages() {
            return Math.ceil(maxentries / opts.items_per_page);
        }

        /**
        * Calculate start and end point of pagination links depending on 
        * current_page and num_display_entries.
        * @return {Array}
        */
        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end];
        }

        /**
        * This is the event handling function for the pagination links. 
        * @param {int} page_id The new page number
        */
        function pageSelected(page_id, evt) {
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }
        

        /**
        * This function inserts the pagination links into the container element
        */
        function drawLinks() {
        	//var pagesubmitBtn = panel.find(".pagesubmit");        	
            //var pageInputText = $($(pagesubmitBtn[0]).prev()[0]);
            //panel.find(".pagesubmit");
            var a = panel.children(":not(.pageInfo)");
            a.remove();
            //panel.find(":not(.pageInfo)").remove();
            //panel.empty();
            
            //panl.remove("div[name = 'gotoNum']");
            
            var interval = getInterval();
            var np = numPages();
            // This helper function returns a handler function that calls pageSelected with the right page_id
            var getClickHandler = function(page_id) {
            	
            	return function(evt) {
                    $($(panel.find(".pagesubmit")[0]).prev()[0]).val("");
            		return pageSelected(page_id, evt); 
            	}
            	//if(arguments.length ==0) page_id=pageInputText.val();
            	//alert(123444);
            	//alert(page_id);
                //return function(evt) { return pageSelected(page_id, evt); }
            }
            // Helper function for generating a single link (or a span tag if it'S the current page)
            var appendItem = function(page_id, appendopts) {
                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
                appendopts = jQuery.extend({ text: page_id + 1, classes: "" }, appendopts || {});
                if (page_id == current_page) {
                    var lnk = $("<li class='active'><a href='javascript:void(0)' style='cursor:pointer;'>" + (appendopts.text) + "</a></li>");
                }
                else {
                    var lnk = $("<li><a href='javascript:void(0);'  style='cursor:pointer;'>" + (appendopts.text) + "</a></li>")
						.bind("click", getClickHandler(page_id))
						.attr('href', 'javascript:void(0)'/*opts.link_to.replace(/__id__/, page_id)*/);
                }
                //if (appendopts.classes) { lnk.removeAttr('class'); lnk.addClass(appendopts.classes); }
                if(panel.find(".pageInfo").length > 0) {
                	panel.find(".pageInfo").before(lnk);
                } else {
                	panel.append(lnk);
                }
            }
            // Generate "Previous"-Link
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                //appendItem(current_page - 1, { text: opts.prev_text, classes: "prev" });
                page_id = (current_page -1) < 0 ? 0 : ((current_page -1) < np ? (current_page -1) : np - 1); // Normalize page id to sane value
                appendopts = jQuery.extend({ text: page_id + 1, classes: "" }, { text: opts.prev_text, classes: "" } || {});
                if (page_id == current_page) {
                    var lnk = $("<li class='zg-last'><a href='javascript:void(0);'  style='cursor:pointer;'>" + (appendopts.text) + "</a></li>");
                }
                else {
                    var lnk = $("<li class='zg-last'><a href='javascript:void(0);'  style='cursor:pointer;'>" + (appendopts.text) + "</a></li>")
						.bind("click", getClickHandler(page_id))
						.attr('href', 'javascript:void(0)');


                }
                if (appendopts.classes) { lnk.removeAttr('class'); lnk.addClass(appendopts.classes); }
               if(panel.find(".pageInfo").length > 0) {
                	panel.find(".pageInfo").before(lnk);
                } else {
                	panel.append(lnk);
                }
            }
            // Generate starting points
            if (interval[0] > 0 && opts.num_edge_entries > 0) {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for (var i = 0; i < end; i++) {
                    appendItem(i);
                }
                if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                    jQuery("<li class='zg-last'><a href='javascript:void(0);'  style='cursor:pointer;'>" + opts.ellipse_text + "</a></li>").appendTo(panel);
                }
            }
            // Generate interval links
            for (var i = interval[0]; i < interval[1]; i++) {
                appendItem(i);
            }
            // Generate ending points
/*            if (interval[1] < np && opts.num_edge_entries > 0) {
                if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                    jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
                var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                for (var i = begin; i < np; i++) {
                    appendItem(i);
                }

            }*/
            // Generate "Next"-Link
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                //appendItem(current_page + 1, { text: opts.next_text, classes: "disabled" });
                page_id = (current_page + 1) < 0 ? 0 : ((current_page + 1) < np ? (current_page +1) : np - 1); // Normalize page id to sane value
                appendopts = jQuery.extend({ text: page_id + 1, classes: "" }, { text: opts.next_text, classes: "" } || {});
                if (page_id == current_page) {
                    var lnk = $("<li class='zg-last'><a href='javascript:void(0);'  style='cursor:pointer;'>" + (appendopts.text) + "</a></li>");
                }
                else {
                    var lnk = $("<li class='zg-last'><a href='javascript:void(0);'  style='cursor:pointer;'>" + (appendopts.text) + "</a></li>")
						.bind("click", getClickHandler(page_id))
						.attr('href', 'javascript:void(0)');


                }
                if (appendopts.classes) { lnk.removeAttr('class'); lnk.addClass(appendopts.classes); }
                if(panel.find(".pageInfo").length > 0) {
                	panel.find(".pageInfo").before(lnk);
                } else {
                	panel.append(lnk);
                }
            }
        }
		
        // Extract current_page from options
        var current_page = opts.current_page;
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        // Store DOM element for easy access from all inner functions
        var panel = jQuery(this);              
        
        // Attach control functions to the DOM element 
        this.selectPage = function(page_id) {pageSelected(page_id); }
        this.prevPage = function() {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function() {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            }
            else {
                return false;
            }
        }
        // When all initialisation is done, draw the links
        drawLinks();
        //add pageId-Input 
/*        var pageInputHtml = '<div class="pageInfo">跳转至<input type="text">页 <input type="button" class="pagesubmit" value="确定"></div>';
        panel.append($(pageInputHtml));
        var pagesubmitBtn = panel.find(".pagesubmit");
        var pageInputText = $($(pagesubmitBtn[0]).prev()[0]);
        
        //after init complete, add event to submitButton
        pagesubmitBtn.click(function(evt) {
        	var page_id_ex = parseInt(($($(panel.find(".pagesubmit")[0]).prev()[0])).val());
        	//var page_id_ex_format = parseInt(page_id_ex) -1;
        	var np_ex = numPages();
        	np_ex = (page_id_ex >= np_ex ? (np_ex-1): page_id_ex -1);
        	pageSelected(np_ex , evt);
        });*/
        
        //var pageInputHtml = '<div>跳转至<input type="text">页 <input type="button" class="pagesubmit" value="确定"></div>';
        //panel.append(pageInputHtml);
    });
}

