                 
                                    $(function () {

                                        var qn = urlQueryString["qn"];
                                        if (qn === 'undefined' || qn == null || qn == undefined) {
                                            qn = "";
                                        }
                                        $('#tableFilterParamer thead tr.search th').each(function () {
                                            var title = $('#tableFilterParamer thead th').eq($(this).index()).text();
                                            if (title != '#') {
                                                $(this).html('');
                                                var searchtxt = $('<input type="text" class=\'form-control\' placeholder="Search ' + title + '" style="width:100%;"/>');
                                                if (title == "Parameter Name" && qn != "") {
                                                    searchtxt.attr("id", "txtSearchByParameter");
                                                }
                                                $(this).append(searchtxt);
                                            }
                                            else {
                                                $(this).html('');
                                            }
                                        });

                                        // Apply the filter

                                        $("#tableFilterParamer thead input").on('keyup change', function () {
                                            table
                                                .column($(this).parent().index() + ':visible')
                                                .search(this.value)
                                                .draw();
                                        })

                                        $('#tableFilterParamer').on("draw.dt", function () {
                                            $('#tableFilterParamer > thead > tr[role="row"] > th').removeClass('sorting');
                                        });
                                        var table = $('#tableFilterParamer').DataTable({
                                            orderCellsTop: true,
                                            "scrollX": true,
                                            "pageLength": 50,
                                        });
                                        $('#txtSearchByParameter').val(qn).change();
                                        //function stopPropagation(evt) {
                                        //    if (evt.stopPropagation !== undefined) {
                                        //        evt.stopPropagation();
                                        //    } else {
                                        //        evt.cancelBubble = true;
                                        //    }
                                        //}

                                        $('div.dataTables_paginate').closest('div.row').css('margin-top', '30px');
                                    });
                                
