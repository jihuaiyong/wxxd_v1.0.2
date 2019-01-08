
(function(){
    //inpMany
    $.fn.inpMany = function(){
        this.each(function(){
            var _self = this;
            var $view 		= $(_self).find('.zg-form-control'),
                $dialog 	= $(_self).find('.inpArea'),
                $btnSure 	= $(_self).find('.btn-sure'),
                $btnCancel 	= $(_self).find('.btn-cancel'),
                $textarea 	= $(_self).find('textarea');
            $view.on('click', function(){
                if($dialog.hasClass('active')){
                    //hide
                    $dialog.removeClass('active');
                }else{
                    //show
                    $('.inpArea').removeClass('active');
                    $dialog.addClass('active');

                    var _val = $(this).text().trim().split(',').join('\n');
                    $textarea.val(_val).focus();
                }
            })
            $btnSure.on('click', function(){
                var _val = $textarea.val().trim();
                $view.html(_val.split('\n').join(','));
                $dialog.removeClass('active')
            })
            $btnCancel.on('click', function(){
                $dialog.removeClass('active')
            })

            $(_self).on('click', function(e){e.stopPropagation()})
            $(document).on('click', function(){ $dialog.removeClass('active');})
        })
        
    }

    //select-multiple
    $.fn.selectMultiple = function(){
        this.each(function(){
            var _self = this;
            var $options = $(_self).find('.innerPop input[name!=all]');
            var $all = $(_self).find('.innerPop input[name=all]');
            var aChecked = []; //已选择
            
            $all.on('change', function(){
                var _checked = this.checked;
                $options.each(function(index, item){
                    item.checked = _checked;
                })
            })

            $options.on('change', function(){
                if(this.checked){
                    var _checked = true;
                    $options.each(function(index, item){
                        if(!item.checked){
                            _checked = false;
                        }
                    })
                    $all[0].checked = _checked;
                }else{
                    $all[0].checked = false;
                }
            })

            var $btnSure = $(_self).find('.btn-sure');
            var $btnCancel = $(_self).find('.btn-cancel');
            var $view = $(_self).find('.zg-form-control');
            var $dialog = $(_self).find('.innerPop');
            var $iconCaret = $(_self).find('.icon-caret-down');
            
            function getChecked(){
                var cache_checked = [];
                $options.each(function(index, item){
                    if(this.checked){
                        cache_checked.push({
                            name: $(item).attr('name'),
                            value: $(item).next().text()
                        })
                    }
                })
                return cache_checked;
            }

            $btnSure.on('click', function(){
                var _word = '全部';
                if($(this).hasClass('disabled')) return;
                var cache_checked = getChecked();
                if(cache_checked.length != $options.length){
                    _word = '已选择'+ cache_checked.length +'项';
                }
                $view.html(_word);
                aChecked = cache_checked;
                $dialog.hide();
            })

            $btnCancel.on('click', function(){
                $dialog.hide();
            })

            function toggleDialog(){
                $dialog.toggle();
                if($dialog.is(':visible')){
                    //show
                    $options.each(function(index, item){
                        item.checked = false;
                        aChecked.forEach(function(checkedItem, index){
                            if(item.name == checkedItem.name){
                                item.checked = true;
                            }
                        })
                    })
                    if($options.length == aChecked.length){
                        $all[0].checked = true;
                    }else{
                        $all[0].checked = false;
                    }
                }
            }
            $view.on('click', toggleDialog)
            $iconCaret.on('click', toggleDialog)

            $(_self).on('click', function(e){e.stopPropagation()})

            $(document).on('click', function(){
                $dialog.hide();
            })

            _self.data = function(){
                return aChecked
            };
        })
    }

})()