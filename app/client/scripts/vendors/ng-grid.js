(function(e, n) {
    "use strict";
    var t = 6,
        o = 4,
        r = "asc",
        i = "desc",
        l = "_ng_field_",
        a = "_ng_depth_",
        s = "_ng_hidden_",
        c = "_ng_column_",
        g = /CUSTOM_FILTERS/g,
        d = /COL_FIELD/g,
        u = /DISPLAY_CELL_TEMPLATE/g,
        f = /EDITABLE_CELL_TEMPLATE/g,
        h = /CELL_EDITABLE_CONDITION/g,
        p = /<.+>/;
    e.ngGrid = {}, e.ngGrid.i18n = {}, angular.module("ngGrid.services", []);
    var m = angular.module("ngGrid.directives", []),
        v = angular.module("ngGrid.filters", []);
    angular.module("ngGrid", ["ngGrid.services", "ngGrid.directives", "ngGrid.filters"]);
    var w = function(e, n, o, r) {
        if (void 0 === e.selectionProvider.selectedItems) return !0;
        var i, l = o.which || o.keyCode,
            a = !1,
            s = !1,
            c = void 0 === e.selectionProvider.lastClickedRow ? 1 : e.selectionProvider.lastClickedRow.rowIndex,
            g = e.columns.filter(function(e) {
                return e.visible
            }),
            d = e.columns.filter(function(e) {
                return e.pinned
            });
        if (e.col && (i = g.indexOf(e.col)), 37 !== l && 38 !== l && 39 !== l && 40 !== l && (r.config.noTabInterference || 9 !== l) && 13 !== l) return !0;
        if (e.enableCellSelection) {
            9 === l && o.preventDefault();
            var u = e.showSelectionCheckbox ? 1 === e.col.index : 0 === e.col.index,
                f = 1 === e.$index || 0 === e.$index,
                h = e.$index === e.renderedColumns.length - 1 || e.$index === e.renderedColumns.length - 2,
                p = g.indexOf(e.col) === g.length - 1,
                m = d.indexOf(e.col) === d.length - 1;
            if (37 === l || 9 === l && o.shiftKey) {
                var v = 0;
                u || (i -= 1), f ? u && 9 === l && o.shiftKey ? (v = r.$canvas.width(), i = g.length - 1, s = !0) : v = r.$viewport.scrollLeft() - e.col.width : d.length > 0 && (v = r.$viewport.scrollLeft() - g[i].width), r.$viewport.scrollLeft(v)
            } else(39 === l || 9 === l && !o.shiftKey) && (h ? p && 9 === l && !o.shiftKey ? (r.$viewport.scrollLeft(0), i = e.showSelectionCheckbox ? 1 : 0, a = !0) : r.$viewport.scrollLeft(r.$viewport.scrollLeft() + e.col.width) : m && r.$viewport.scrollLeft(0), p || (i += 1))
        }
        var w;
        w = e.configGroups.length > 0 ? r.rowFactory.parsedData.filter(function(e) {
            return !e.isAggRow
        }) : r.filteredRows;
        var C = 0;
        if (0 !== c && (38 === l || 13 === l && o.shiftKey || 9 === l && o.shiftKey && s) ? C = -1 : c !== w.length - 1 && (40 === l || 13 === l && !o.shiftKey || 9 === l && a) && (C = 1), C) {
            var b = w[c + C];
            b.beforeSelectionChange(b, o) && (b.continueSelection(o), e.$emit("ngGridEventDigestGridParent"), e.selectionProvider.lastClickedRow.renderedRowIndex >= e.renderedRows.length - t - 2 ? r.$viewport.scrollTop(r.$viewport.scrollTop() + e.rowHeight) : t + 2 >= e.selectionProvider.lastClickedRow.renderedRowIndex && r.$viewport.scrollTop(r.$viewport.scrollTop() - e.rowHeight))
        }
        return e.enableCellSelection && setTimeout(function() {
            e.domAccessProvider.focusCellElement(e, e.renderedColumns.indexOf(g[i]))
        }, 3), !1
    };
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        var n = this.length >>> 0,
            t = Number(arguments[1]) || 0;
        for (t = 0 > t ? Math.ceil(t) : Math.floor(t), 0 > t && (t += n); n > t; t++)
            if (t in this && this[t] === e) return t;
        return -1
    }), Array.prototype.filter || (Array.prototype.filter = function(e) {
        var n = Object(this),
            t = n.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var o = [], r = arguments[1], i = 0; t > i; i++)
            if (i in n) {
                var l = n[i];
                e.call(r, l, i, n) && o.push(l)
            }
        return o
    }), v.filter("checkmark", function() {
        return function(e) {
            return e ? "✔" : "✘"
        }
    }), v.filter("ngColumns", function() {
        return function(e) {
            return e.filter(function(e) {
                return !e.isAggCol
            })
        }
    }), angular.module("ngGrid.services").factory("$domUtilityService", ["$utilityService", "$window", function(e, t) {
        var o = {},
            r = {},
            i = function() {
                var e = n("<div></div>");
                e.appendTo("body"), e.height(100).width(100).css("position", "absolute").css("overflow", "scroll"), e.append('<div style="height: 400px; width: 400px;"></div>'), o.ScrollH = e.height() - e[0].clientHeight, o.ScrollW = e.width() - e[0].clientWidth, e.empty(), e.attr("style", ""), e.append('<span style="font-family: Verdana, Helvetica, Sans-Serif; font-size: 14px;"><strong>M</strong></span>'), o.LetterW = e.children().first().width(), e.remove()
            };
        return o.eventStorage = {}, o.AssignGridContainers = function(e, t, r) {
            r.$root = n(t), r.$topPanel = r.$root.find(".ngTopPanel"), r.$groupPanel = r.$root.find(".ngGroupPanel"), r.$headerContainer = r.$topPanel.find(".ngHeaderContainer"), e.$headerContainer = r.$headerContainer, r.$headerScroller = r.$topPanel.find(".ngHeaderScroller"), r.$headers = r.$headerScroller.children(), r.$viewport = r.$root.find(".ngViewport"), r.$canvas = r.$viewport.find(".ngCanvas"), r.$footerPanel = r.$root.find(".ngFooterPanel");
            var i = e.$watch(function() {
                return r.$viewport.scrollLeft()
            }, function(e) {
                return r.$headerContainer.scrollLeft(e)
            });
            e.$on("$destroy", function() {
                n(r.$root.parent()).off("resize.nggrid"), r.$root = null, r.$topPanel = null, r.$headerContainer = null, r.$headers = null, r.$canvas = null, r.$footerPanel = null, i()
            }), o.UpdateGridLayout(e, r)
        }, o.getRealWidth = function(e) {
            var t = 0,
                o = {
                    visibility: "hidden",
                    display: "block"
                },
                r = e.parents().andSelf().not(":visible");
            return n.swap(r[0], o, function() {
                t = e.outerWidth()
            }), t
        }, o.UpdateGridLayout = function(e, n) {
            if (n.$root) {
                var t = n.$viewport.scrollTop();
                n.elementDims.rootMaxW = n.$root.width(), n.$root.is(":hidden") && (n.elementDims.rootMaxW = o.getRealWidth(n.$root)), n.elementDims.rootMaxH = n.$root.height(), n.refreshDomSizes(), e.adjustScrollTop(t, !0)
            }
        }, o.numberOfGrids = 0, o.setStyleText = function(e, n) {
            var o = e.styleSheet,
                r = e.gridId,
                i = t.document;
            o || (o = i.getElementById(r)), o || (o = i.createElement("style"), o.type = "text/css", o.id = r, (i.head || i.getElementsByTagName("head")[0]).appendChild(o)), o.styleSheet && !o.sheet ? o.styleSheet.cssText = n : o.innerHTML = n, e.styleSheet = o, e.styleText = n
        }, o.BuildStyles = function(e, n, t) {
            var r, i = n.config.rowHeight,
                l = n.gridId,
                a = e.columns,
                s = 0,
                c = e.totalRowWidth();
            r = "." + l + " .ngCanvas { width: " + c + "px; }" + "." + l + " .ngRow { width: " + c + "px; }" + "." + l + " .ngCanvas { width: " + c + "px; }" + "." + l + " .ngHeaderScroller { width: " + (c + o.ScrollH) + "px}";
            for (var g = 0; a.length > g; g++) {
                var d = a[g];
                d.visible !== !1 && (r += "." + l + " .col" + g + " { width: " + d.width + "px; left: " + s + "px; height: " + i + "px }" + "." + l + " .colt" + g + " { width: " + d.width + "px; }", s += d.width)
            }
            o.setStyleText(n, r), e.adjustScrollLeft(n.$viewport.scrollLeft()), t && o.digest(e)
        }, o.setColLeft = function(e, n, t) {
            if (t.styleText) {
                var i = r[e.index];
                i || (i = r[e.index] = RegExp(".col" + e.index + " { width: [0-9]+px; left: [0-9]+px"));
                var l = t.styleText.replace(i, ".col" + e.index + " { width: " + e.width + "px; left: " + n + "px");
                o.setStyleText(t, l)
            }
        }, o.setColLeft.immediate = 1, o.RebuildGrid = function(e, n) {
            o.UpdateGridLayout(e, n), (null == n.config.maintainColumnRatios || n.config.maintainColumnRatios) && n.configureColumnWidths(), e.adjustScrollLeft(n.$viewport.scrollLeft()), o.BuildStyles(e, n, !0)
        }, o.digest = function(e) {
            e.$root.$$phase || e.$digest()
        }, o.ScrollH = 17, o.ScrollW = 17, o.LetterW = 10, i(), o
    }]), angular.module("ngGrid.services").factory("$sortService", ["$parse", function(e) {
        var n = {};
        return n.colSortFnCache = {}, n.isCustomSort = !1, n.guessSortFn = function(e) {
            var t = typeof e;
            switch (t) {
                case "number":
                    return n.sortNumber;
                case "boolean":
                    return n.sortBool;
                case "string":
                    return e.match(/^[-+]?[£$¤]?[\d,.]+%?$/) ? n.sortNumberStr : n.sortAlpha;
                default:
                    return "[object Date]" === Object.prototype.toString.call(e) ? n.sortDate : n.basicSort
            }
        }, n.basicSort = function(e, n) {
            return e === n ? 0 : n > e ? -1 : 1
        }, n.sortNumber = function(e, n) {
            return e - n
        }, n.sortNumberStr = function(e, n) {
            var t, o, r = !1,
                i = !1;
            return t = parseFloat(e.replace(/[^0-9.-]/g, "")), isNaN(t) && (r = !0), o = parseFloat(n.replace(/[^0-9.-]/g, "")), isNaN(o) && (i = !0), r && i ? 0 : r ? 1 : i ? -1 : t - o
        }, n.sortAlpha = function(e, n) {
            var t = e.toLowerCase(),
                o = n.toLowerCase();
            return t === o ? 0 : o > t ? -1 : 1
        }, n.sortDate = function(e, n) {
            var t = e.getTime(),
                o = n.getTime();
            return t === o ? 0 : o > t ? -1 : 1
        }, n.sortBool = function(e, n) {
            return e && n ? 0 : e || n ? e ? 1 : -1 : 0
        }, n.sortData = function(t, o) {
            if (o && t) {
                var i, l, a = t.fields.length,
                    s = t.fields,
                    c = o.slice(0);
                o.sort(function(o, g) {
                    for (var d, u, f = 0, h = 0; 0 === f && a > h;) {
                        i = t.columns[h], l = t.directions[h], u = n.getSortFn(i, c);
                        var p = e(s[h])(o),
                            m = e(s[h])(g);
                        n.isCustomSort ? (d = u(p, m), f = l === r ? d : 0 - d) : !p && 0 !== p || !m && 0 !== m ? m || p ? p ? m || (f = -1) : f = 1 : f = 0 : (d = u(p, m), f = l === r ? d : 0 - d), h++
                    }
                    return f
                })
            }
        }, n.Sort = function(e, t) {
            n.isSorting || (n.isSorting = !0, n.sortData(e, t), n.isSorting = !1)
        }, n.getSortFn = function(t, o) {
            var r, i;
            if (n.colSortFnCache[t.field]) r = n.colSortFnCache[t.field];
            else if (void 0 !== t.sortingAlgorithm) r = t.sortingAlgorithm, n.colSortFnCache[t.field] = t.sortingAlgorithm, n.isCustomSort = !0;
            else {
                if (i = o[0], !i) return r;
                r = n.guessSortFn(e(t.field)(i)), r ? n.colSortFnCache[t.field] = r : r = n.sortAlpha
            }
            return r
        }, n
    }]), angular.module("ngGrid.services").factory("$utilityService", ["$parse", function(t) {
        var o = /function (.{1,})\(/,
            r = {
                visualLength: function(e) {
                    var t = document.getElementById("testDataLength");
                    t || (t = document.createElement("SPAN"), t.id = "testDataLength", t.style.visibility = "hidden", document.body.appendChild(t));
                    var o = n(e);
                    n(t).css({
                        font: o.css("font"),
                        "font-size": o.css("font-size"),
                        "font-family": o.css("font-family")
                    }), t.innerHTML = o.text();
                    var r = t.offsetWidth;
                    return document.body.removeChild(t), r
                },
                forIn: function(e, n) {
                    for (var t in e) e.hasOwnProperty(t) && n(e[t], t)
                },
                evalProperty: function(e, n) {
                    return t("entity." + n)({
                        entity: e
                    })
                },
                endsWith: function(e, n) {
                    return e && n && "string" == typeof e ? -1 !== e.indexOf(n, e.length - n.length) : !1
                },
                isNullOrUndefined: function(e) {
                    return void 0 === e || null === e ? !0 : !1
                },
                getElementsByClassName: function(e) {
                    if (document.getElementsByClassName) return document.getElementsByClassName(e);
                    for (var n = [], t = RegExp("\\b" + e + "\\b"), o = document.getElementsByTagName("*"), r = 0; o.length > r; r++) {
                        var i = o[r].className;
                        t.test(i) && n.push(o[r])
                    }
                    return n
                },
                newId: function() {
                    var e = (new Date).getTime();
                    return function() {
                        return e += 1
                    }
                }(),
                seti18n: function(n, t) {
                    var o = e.ngGrid.i18n[t];
                    for (var r in o) n.i18n[r] = o[r]
                },
                getInstanceType: function(e) {
                    var n = o.exec("" + e.constructor);
                    if (n && n.length > 1) {
                        var t = n[1].replace(/^\s+|\s+$/g, "");
                        return t
                    }
                    return ""
                }
            };
        return r
    }]);
    var C = function(e, n, t, o) {
        this.rowIndex = 0, this.offsetTop = this.rowIndex * t, this.entity = e, this.label = e.gLabel, this.field = e.gField, this.depth = e.gDepth, this.parent = e.parent, this.children = e.children, this.aggChildren = e.aggChildren, this.aggIndex = e.aggIndex, this.collapsed = o, this.groupInitState = o, this.rowFactory = n, this.rowHeight = t, this.isAggRow = !0, this.offsetLeft = 25 * e.gDepth, this.aggLabelFilter = e.aggLabelFilter
    };
    C.prototype.toggleExpand = function() {
        this.collapsed = this.collapsed ? !1 : !0, this.orig && (this.orig.collapsed = this.collapsed), this.notifyChildren()
    }, C.prototype.setExpand = function(e) {
        this.collapsed = e, this.notifyChildren()
    }, C.prototype.notifyChildren = function() {
        for (var e = Math.max(this.rowFactory.aggCache.length, this.children.length), n = 0; e > n; n++)
            if (this.aggChildren[n] && (this.aggChildren[n].entity[s] = this.collapsed, this.collapsed && this.aggChildren[n].setExpand(this.collapsed)), this.children[n] && (this.children[n][s] = this.collapsed), n > this.aggIndex && this.rowFactory.aggCache[n]) {
                var t = this.rowFactory.aggCache[n],
                    o = 30 * this.children.length;
                t.offsetTop = this.collapsed ? t.offsetTop - o : t.offsetTop + o
            }
        this.rowFactory.renderedChange()
    }, C.prototype.aggClass = function() {
        return this.collapsed ? "ngAggArrowCollapsed" : "ngAggArrowExpanded"
    }, C.prototype.totalChildren = function() {
        if (this.aggChildren.length > 0) {
            var e = 0,
                n = function(t) {
                    t.aggChildren.length > 0 ? angular.forEach(t.aggChildren, function(e) {
                        n(e)
                    }) : e += t.children.length
                };
            return n(this), e
        }
        return this.children.length
    }, C.prototype.copy = function() {
        var e = new C(this.entity, this.rowFactory, this.rowHeight, this.groupInitState);
        return e.orig = this, e
    };
    var b = function(e, t, o, l, a, s) {
            var c = this,
                d = e.colDef,
                u = 500,
                f = 0,
                h = null;
            c.colDef = e.colDef, c.width = d.width, c.groupIndex = 0, c.isGroupedBy = !1, c.minWidth = d.minWidth ? d.minWidth : 50, c.maxWidth = d.maxWidth ? d.maxWidth : 9e3, c.enableCellEdit = void 0 !== d.enableCellEdit ? d.enableCellEdit : e.enableCellEdit || e.enableCellEditOnFocus, c.cellEditableCondition = d.cellEditableCondition || e.cellEditableCondition || "true", c.headerRowHeight = e.headerRowHeight, c.displayName = void 0 === d.displayName ? d.field : d.displayName, c.index = e.index, c.isAggCol = e.isAggCol, c.cellClass = d.cellClass, c.sortPriority = void 0, c.cellFilter = d.cellFilter ? d.cellFilter : "", c.field = d.field, c.aggLabelFilter = d.aggLabelFilter || d.cellFilter, c.visible = s.isNullOrUndefined(d.visible) || d.visible, c.sortable = !1, c.resizable = !1, c.pinnable = !1, c.pinned = e.enablePinning && d.pinned, c.originalIndex = null == e.originalIndex ? c.index : e.originalIndex, c.groupable = s.isNullOrUndefined(d.groupable) || d.groupable, e.enableSort && (c.sortable = s.isNullOrUndefined(d.sortable) || d.sortable), e.enableResize && (c.resizable = s.isNullOrUndefined(d.resizable) || d.resizable), e.enablePinning && (c.pinnable = s.isNullOrUndefined(d.pinnable) || d.pinnable), c.sortDirection = void 0, c.sortingAlgorithm = d.sortFn, c.headerClass = d.headerClass, c.cursor = c.sortable ? "pointer" : "default", c.headerCellTemplate = d.headerCellTemplate || a.get("headerCellTemplate.html"), c.cellTemplate = d.cellTemplate || a.get("cellTemplate.html").replace(g, c.cellFilter ? "|" + c.cellFilter : ""), c.enableCellEdit && (c.cellEditTemplate = d.cellEditTemplate || a.get("cellEditTemplate.html"), c.editableCellTemplate = d.editableCellTemplate || a.get("editableCellTemplate.html")), d.cellTemplate && !p.test(d.cellTemplate) && (c.cellTemplate = a.get(d.cellTemplate) || n.ajax({
                type: "GET",
                url: d.cellTemplate,
                async: !1
            }).responseText), c.enableCellEdit && d.editableCellTemplate && !p.test(d.editableCellTemplate) && (c.editableCellTemplate = a.get(d.editableCellTemplate) || n.ajax({
                type: "GET",
                url: d.editableCellTemplate,
                async: !1
            }).responseText), d.headerCellTemplate && !p.test(d.headerCellTemplate) && (c.headerCellTemplate = a.get(d.headerCellTemplate) || n.ajax({
                type: "GET",
                url: d.headerCellTemplate,
                async: !1
            }).responseText), c.colIndex = function() {
                var e = c.pinned ? "pinned " : "";
                return e += "col" + c.index + " colt" + c.index, c.cellClass && (e += " " + c.cellClass), e
            }, c.groupedByClass = function() {
                return c.isGroupedBy ? "ngGroupedByIcon" : "ngGroupIcon"
            }, c.toggleVisible = function() {
                c.visible = !c.visible
            }, c.showSortButtonUp = function() {
                return c.sortable ? c.sortDirection === i : c.sortable
            }, c.showSortButtonDown = function() {
                return c.sortable ? c.sortDirection === r : c.sortable
            }, c.noSortVisible = function() {
                return !c.sortDirection
            }, c.sort = function(n) {
                if (!c.sortable) return !0;
                var t = c.sortDirection === r ? i : r;
                return c.sortDirection = t, e.sortCallback(c, n), !1
            }, c.gripClick = function() {
                f++, 1 === f ? h = setTimeout(function() {
                    f = 0
                }, u) : (clearTimeout(h), e.resizeOnDataCallback(c), f = 0)
            }, c.gripOnMouseDown = function(e) {
                return t.isColumnResizing = !0, e.ctrlKey && !c.pinned ? (c.toggleVisible(), l.BuildStyles(t, o), !0) : (e.target.parentElement.style.cursor = "col-resize", c.startMousePosition = e.clientX, c.origWidth = c.width, n(document).mousemove(c.onMouseMove), n(document).mouseup(c.gripOnMouseUp), !1)
            }, c.onMouseMove = function(e) {
                var n = e.clientX - c.startMousePosition,
                    r = n + c.origWidth;
                return c.width = c.minWidth > r ? c.minWidth : r > c.maxWidth ? c.maxWidth : r, t.hasUserChangedGridColumnWidths = !0, l.BuildStyles(t, o), !1
            }, c.gripOnMouseUp = function(e) {
                return n(document).off("mousemove", c.onMouseMove), n(document).off("mouseup", c.gripOnMouseUp), e.target.parentElement.style.cursor = "default", l.digest(t), t.isColumnResizing = !1, !1
            }, c.copy = function() {
                var n = new b(e, t, o, l, a, s);
                return n.isClone = !0, n.orig = c, n
            }, c.setVars = function(e) {
                c.orig = e, c.width = e.width, c.groupIndex = e.groupIndex, c.isGroupedBy = e.isGroupedBy, c.displayName = e.displayName, c.index = e.index, c.isAggCol = e.isAggCol, c.cellClass = e.cellClass, c.cellFilter = e.cellFilter, c.field = e.field, c.aggLabelFilter = e.aggLabelFilter, c.visible = e.visible, c.sortable = e.sortable, c.resizable = e.resizable, c.pinnable = e.pinnable, c.pinned = e.pinned, c.originalIndex = e.originalIndex, c.sortDirection = e.sortDirection, c.sortingAlgorithm = e.sortingAlgorithm, c.headerClass = e.headerClass, c.headerCellTemplate = e.headerCellTemplate, c.cellTemplate = e.cellTemplate, c.cellEditTemplate = e.cellEditTemplate
            }
        },
        S = function(e) {
            this.outerHeight = null, this.outerWidth = null, n.extend(this, e)
        },
        y = function(e) {
            this.previousColumn = null, this.grid = e
        };
    y.prototype.changeUserSelect = function(e, n) {
        e.css({
            "-webkit-touch-callout": n,
            "-webkit-user-select": n,
            "-khtml-user-select": n,
            "-moz-user-select": "none" === n ? "-moz-none" : n,
            "-ms-user-select": n,
            "user-select": n
        })
    }, y.prototype.focusCellElement = function(e, n) {
        if (e.selectionProvider.lastClickedRow) {
            var t = void 0 !== n ? n : this.previousColumn,
                o = e.selectionProvider.lastClickedRow.clone ? e.selectionProvider.lastClickedRow.clone.elm : e.selectionProvider.lastClickedRow.elm;
            if (void 0 !== t && o) {
                var r = angular.element(o[0].children).filter(function() {
                        return 8 !== this.nodeType
                    }),
                    i = Math.max(Math.min(e.renderedColumns.length - 1, t), 0);
                this.grid.config.showSelectionCheckbox && angular.element(r[i]).scope() && 0 === angular.element(r[i]).scope().col.index && (i = 1), r[i] && r[i].children[1].children[0].focus(), this.previousColumn = t
            }
        }
    }, y.prototype.selectionHandlers = function(e, n) {
        function t(t) {
            if (16 === t.keyCode) return i.changeUserSelect(n, "none", t), !0;
            if (!r) {
                r = !0;
                var o = w(e, n, t, i.grid);
                return r = !1, o
            }
            return !0
        }

        function o(e) {
            return 16 === e.keyCode && i.changeUserSelect(n, "text", e), !0
        }
        var r = !1,
            i = this;
        n.bind("keydown", t), n.bind("keyup", o), n.on("$destroy", function() {
            n.off("keydown", t), n.off("keyup", o)
        })
    };
    var x = function(t, o, r, i) {
            var l = this;
            l.colToMove = void 0, l.groupToMove = void 0, l.assignEvents = function() {
                t.config.jqueryUIDraggable && !t.config.enablePinning ? (t.$groupPanel.droppable({
                    addClasses: !1,
                    drop: function(e) {
                        l.onGroupDrop(e)
                    }
                }), t.$groupPanel.on("$destroy", function() {
                    t.$groupPanel = null
                })) : (t.$groupPanel.on("mousedown", l.onGroupMouseDown).on("dragover", l.dragOver).on("drop", l.onGroupDrop), t.$topPanel.on("mousedown", ".ngHeaderScroller", l.onHeaderMouseDown).on("dragover", ".ngHeaderScroller", l.dragOver), t.$groupPanel.on("$destroy", function() {
                    t.$groupPanel && t.$groupPanel.off("mousedown"), t.$groupPanel = null
                }), t.config.enableColumnReordering && t.$topPanel.on("drop", ".ngHeaderScroller", l.onHeaderDrop), t.$topPanel.on("$destroy", function() {
                    t.$topPanel && t.$topPanel.off("mousedown"), t.config.enableColumnReordering && t.$topPanel && t.$topPanel.off("drop"), t.$topPanel = null
                })), o.$on("$destroy", o.$watch("renderedColumns", function() {
                    i(l.setDraggables)
                }))
            }, l.dragStart = function(e) {
                e.dataTransfer.setData("text", "")
            }, l.dragOver = function(e) {
                e.preventDefault()
            }, l.setDraggables = function() {
                if (t.config.jqueryUIDraggable) t.$root && t.$root.find(".ngHeaderSortColumn").draggable({
                    helper: "clone",
                    appendTo: "body",
                    stack: "div",
                    addClasses: !1,
                    start: function(e) {
                        l.onHeaderMouseDown(e)
                    }
                }).droppable({
                    drop: function(e) {
                        l.onHeaderDrop(e)
                    }
                });
                else {
                    var e = t.$root.find(".ngHeaderSortColumn");
                    if (angular.forEach(e, function(e) {
                            e.className && -1 !== e.className.indexOf("ngHeaderSortColumn") && (e.setAttribute("draggable", "true"), e.addEventListener && (e.addEventListener("dragstart", l.dragStart), angular.element(e).on("$destroy", function() {
                                angular.element(e).off("dragstart", l.dragStart), e.removeEventListener("dragstart", l.dragStart)
                            })))
                        }), -1 !== navigator.userAgent.indexOf("MSIE")) {
                        var n = t.$root.find(".ngHeaderSortColumn");
                        n.bind("selectstart", function() {
                            return this.dragDrop(), !1
                        }), angular.element(n).on("$destroy", function() {
                            n.off("selectstart")
                        })
                    }
                }
            }, l.onGroupMouseDown = function(e) {
                var o = n(e.target);
                if ("ngRemoveGroup" !== o[0].className) {
                    var r = angular.element(o).scope();
                    r && (t.config.jqueryUIDraggable || (o.attr("draggable", "true"), this.addEventListener && (this.addEventListener("dragstart", l.dragStart), angular.element(this).on("$destroy", function() {
                        this.removeEventListener("dragstart", l.dragStart)
                    })), -1 !== navigator.userAgent.indexOf("MSIE") && (o.bind("selectstart", function() {
                        return this.dragDrop(), !1
                    }), o.on("$destroy", function() {
                        o.off("selectstart")
                    }))), l.groupToMove = {
                        header: o,
                        groupName: r.group,
                        index: r.$index
                    })
                } else l.groupToMove = void 0
            }, l.onGroupDrop = function(e) {
                e.stopPropagation();
                var r, i;
                l.groupToMove ? (r = n(e.target).closest(".ngGroupElement"), "ngGroupPanel" === r.context.className ? (o.configGroups.splice(l.groupToMove.index, 1), o.configGroups.push(l.groupToMove.groupName)) : (i = angular.element(r).scope(), i && l.groupToMove.index !== i.$index && (o.configGroups.splice(l.groupToMove.index, 1), o.configGroups.splice(i.$index, 0, l.groupToMove.groupName))), l.groupToMove = void 0, t.fixGroupIndexes()) : l.colToMove && (-1 === o.configGroups.indexOf(l.colToMove.col) && (r = n(e.target).closest(".ngGroupElement"), "ngGroupPanel" === r.context.className || "ngGroupPanelDescription ng-binding" === r.context.className ? o.groupBy(l.colToMove.col) : (i = angular.element(r).scope(), i && o.removeGroup(i.$index))), l.colToMove = void 0), o.$$phase || o.$apply()
            }, l.onHeaderMouseDown = function(e) {
                var t = n(e.target).closest(".ngHeaderSortColumn"),
                    o = angular.element(t).scope();
                o && (l.colToMove = {
                    header: t,
                    col: o.col
                })
            }, l.onHeaderDrop = function(e) {
                if (l.colToMove && !l.colToMove.col.pinned) {
                    var i = n(e.target).closest(".ngHeaderSortColumn"),
                        a = angular.element(i).scope();
                    if (a) {
                        if (l.colToMove.col === a.col || a.col.pinned) return;
                        o.columns.splice(l.colToMove.col.index, 1), o.columns.splice(a.col.index, 0, l.colToMove.col), t.fixColumnIndexes(), l.colToMove = void 0, r.digest(o)
                    }
                }
            }, l.assignGridEventHandlers = function() {
                -1 === t.config.tabIndex ? (t.$viewport.attr("tabIndex", r.numberOfGrids), r.numberOfGrids++) : t.$viewport.attr("tabIndex", t.config.tabIndex);
                var i, l = function() {
                    clearTimeout(i), i = setTimeout(function() {
                        r.RebuildGrid(o, t)
                    }, 100)
                };
                n(e).on("resize.nggrid", l);
                var a, s = function() {
                    clearTimeout(a), a = setTimeout(function() {
                        r.RebuildGrid(o, t)
                    }, 100)
                };
                n(t.$root.parent()).on("resize.nggrid", s), o.$on("$destroy", function() {
                    n(e).off("resize.nggrid", l)
                })
            }, l.assignGridEventHandlers(), l.assignEvents()
        },
        T = function(e, n) {
            e.maxRows = function() {
                var t = Math.max(e.totalServerItems, n.data.length);
                return t
            }, e.$on("$destroy", e.$watch("totalServerItems", function() {
                e.currentMaxPages = e.maxPages()
            })), e.multiSelect = n.config.enableRowSelection && n.config.multiSelect, e.selectedItemCount = n.selectedItemCount, e.maxPages = function() {
                return 0 === e.maxRows() ? 1 : Math.ceil(e.maxRows() / e.pagingOptions.pageSize)
            }, e.pageForward = function() {
                var n = e.pagingOptions.currentPage;
                e.totalServerItems > 0 ? e.pagingOptions.currentPage = Math.min(n + 1, e.maxPages()) : e.pagingOptions.currentPage++
            }, e.pageBackward = function() {
                var n = e.pagingOptions.currentPage;
                e.pagingOptions.currentPage = Math.max(n - 1, 1)
            }, e.pageToFirst = function() {
                e.pagingOptions.currentPage = 1
            }, e.pageToLast = function() {
                var n = e.maxPages();
                e.pagingOptions.currentPage = n
            }, e.cantPageForward = function() {
                var t = e.pagingOptions.currentPage,
                    o = e.maxPages();
                return e.totalServerItems > 0 ? t >= o : 1 > n.data.length
            }, e.cantPageToLast = function() {
                return e.totalServerItems > 0 ? e.cantPageForward() : !0
            }, e.cantPageBackward = function() {
                var n = e.pagingOptions.currentPage;
                return 1 >= n
            }
        },
        P = function(r, i, l, a, c, g, d, u, f, h, m) {
            var v = {
                    aggregateTemplate: void 0,
                    afterSelectionChange: function() {},
                    beforeSelectionChange: function() {
                        return !0
                    },
                    checkboxCellTemplate: void 0,
                    checkboxHeaderTemplate: void 0,
                    columnDefs: void 0,
                    data: [],
                    dataUpdated: function() {},
                    enableCellEdit: !1,
                    enableCellEditOnFocus: !1,
                    enableCellSelection: !1,
                    enableColumnResize: !1,
                    enableColumnReordering: !1,
                    enableColumnHeavyVirt: !1,
                    enablePaging: !1,
                    enablePinning: !1,
                    enableRowSelection: !0,
                    enableSorting: !0,
                    enableHighlighting: !1,
                    excludeProperties: [],
                    filterOptions: {
                        filterText: "",
                        useExternalFilter: !1
                    },
                    footerRowHeight: 55,
                    footerTemplate: void 0,
                    forceSyncScrolling: !0,
                    groups: [],
                    groupsCollapsedByDefault: !0,
                    headerRowHeight: 30,
                    headerRowTemplate: void 0,
                    jqueryUIDraggable: !1,
                    jqueryUITheme: !1,
                    keepLastSelected: !0,
                    maintainColumnRatios: void 0,
                    menuTemplate: void 0,
                    multiSelect: !0,
                    pagingOptions: {
                        pageSizes: [250, 500, 1e3],
                        pageSize: 250,
                        currentPage: 1
                    },
                    pinSelectionCheckbox: !1,
                    plugins: [],
                    primaryKey: void 0,
                    rowHeight: 30,
                    rowTemplate: void 0,
                    selectedItems: [],
                    selectWithCheckboxOnly: !1,
                    showColumnMenu: !1,
                    showFilter: !1,
                    showFooter: !1,
                    showGroupPanel: !1,
                    showSelectionCheckbox: !1,
                    sortInfo: {
                        fields: [],
                        columns: [],
                        directions: []
                    },
                    tabIndex: -1,
                    totalServerItems: 0,
                    useExternalSorting: !1,
                    i18n: "en",
                    virtualizationThreshold: 50,
                    noTabInterference: !1
                },
                w = this;
            w.maxCanvasHt = 0, w.config = n.extend(v, e.ngGrid.config, i), w.config.showSelectionCheckbox = w.config.showSelectionCheckbox && w.config.enableColumnHeavyVirt === !1, w.config.enablePinning = w.config.enablePinning && w.config.enableColumnHeavyVirt === !1, w.config.selectWithCheckboxOnly = w.config.selectWithCheckboxOnly && w.config.showSelectionCheckbox !== !1, w.config.pinSelectionCheckbox = w.config.enablePinning, "string" == typeof i.columnDefs && (w.config.columnDefs = r.$eval(i.columnDefs)), w.rowCache = [], w.rowMap = [], w.gridId = "ng" + d.newId(), w.$root = null, w.$groupPanel = null, w.$topPanel = null, w.$headerContainer = null, w.$headerScroller = null, w.$headers = null, w.$viewport = null, w.$canvas = null, w.rootDim = w.config.gridDim, w.data = [], w.lateBindColumns = !1, w.filteredRows = [], w.initTemplates = function() {
                var e = ["rowTemplate", "aggregateTemplate", "headerRowTemplate", "checkboxCellTemplate", "checkboxHeaderTemplate", "menuTemplate", "footerTemplate"],
                    n = [];
                return angular.forEach(e, function(e) {
                    n.push(w.getTemplate(e))
                }), m.all(n)
            }, w.getTemplate = function(e) {
                var n = w.config[e],
                    t = w.gridId + e + ".html",
                    o = m.defer();
                if (n && !p.test(n)) h.get(n, {
                    cache: g
                }).success(function(e) {
                    g.put(t, e), o.resolve()
                }).error(function() {
                    o.reject("Could not load template: " + n)
                });
                else if (n) g.put(t, n), o.resolve();
                else {
                    var r = e + ".html";
                    g.put(t, g.get(r)), o.resolve()
                }
                return o.promise
            }, "object" == typeof w.config.data && (w.data = w.config.data), w.calcMaxCanvasHeight = function() {
                var e;
                return e = w.config.groups.length > 0 ? w.rowFactory.parsedData.filter(function(e) {
                    return !e[s]
                }).length * w.config.rowHeight : w.filteredRows.length * w.config.rowHeight
            }, w.elementDims = {
                scrollW: 0,
                scrollH: 0,
                rowIndexCellW: 25,
                rowSelectedCellW: 25,
                rootMaxW: 0,
                rootMaxH: 0
            }, w.setRenderedRows = function(e) {
                r.renderedRows.length = e.length;
                for (var n = 0; e.length > n; n++) !r.renderedRows[n] || e[n].isAggRow || r.renderedRows[n].isAggRow ? (r.renderedRows[n] = e[n].copy(), r.renderedRows[n].collapsed = e[n].collapsed, e[n].isAggRow || r.renderedRows[n].setVars(e[n])) : r.renderedRows[n].setVars(e[n]), r.renderedRows[n].rowIndex = e[n].rowIndex, r.renderedRows[n].offsetTop = e[n].offsetTop, r.renderedRows[n].selected = e[n].selected, e[n].renderedRowIndex = n;
                w.refreshDomSizes(), r.$emit("ngGridEventRows", e)
            }, w.minRowsToRender = function() {
                var e = r.viewportDimHeight() || 1;
                return Math.floor(e / w.config.rowHeight)
            }, w.refreshDomSizes = function() {
                var e = new S;
                e.outerWidth = w.elementDims.rootMaxW, e.outerHeight = w.elementDims.rootMaxH, w.rootDim = e, w.maxCanvasHt = w.calcMaxCanvasHeight()
            }, w.buildColumnDefsFromData = function() {
                w.config.columnDefs = [];
                var e = w.data[0];
                return e ? (d.forIn(e, function(e, n) {
                    -1 === w.config.excludeProperties.indexOf(n) && w.config.columnDefs.push({
                        field: n
                    })
                }), void 0) : (w.lateBoundColumns = !0, void 0)
            }, w.buildColumns = function() {
                var e = w.config.columnDefs,
                    n = [];
                if (e || (w.buildColumnDefsFromData(), e = w.config.columnDefs), w.config.showSelectionCheckbox && n.push(new b({
                        colDef: {
                            field: "✔",
                            width: w.elementDims.rowSelectedCellW,
                            sortable: !1,
                            resizable: !1,
                            groupable: !1,
                            headerCellTemplate: g.get(r.gridId + "checkboxHeaderTemplate.html"),
                            cellTemplate: g.get(r.gridId + "checkboxCellTemplate.html"),
                            pinned: w.config.pinSelectionCheckbox
                        },
                        index: 0,
                        headerRowHeight: w.config.headerRowHeight,
                        sortCallback: w.sortData,
                        resizeOnDataCallback: w.resizeOnData,
                        enableResize: w.config.enableColumnResize,
                        enableSort: w.config.enableSorting,
                        enablePinning: w.config.enablePinning
                    }, r, w, a, g, d)), e.length > 0) {
                    var t = w.config.showSelectionCheckbox ? 1 : 0,
                        o = r.configGroups.length;
                    r.configGroups.length = 0, angular.forEach(e, function(e, i) {
                        i += t;
                        var l = new b({
                                colDef: e,
                                index: i + o,
                                originalIndex: i,
                                headerRowHeight: w.config.headerRowHeight,
                                sortCallback: w.sortData,
                                resizeOnDataCallback: w.resizeOnData,
                                enableResize: w.config.enableColumnResize,
                                enableSort: w.config.enableSorting,
                                enablePinning: w.config.enablePinning,
                                enableCellEdit: w.config.enableCellEdit || w.config.enableCellEditOnFocus,
                                cellEditableCondition: w.config.cellEditableCondition
                            }, r, w, a, g, d),
                            s = w.config.groups.indexOf(e.field); - 1 !== s && (l.isGroupedBy = !0, r.configGroups.splice(s, 0, l), l.groupIndex = r.configGroups.length), n.push(l)
                    }), r.columns = n, w.config.groups.length > 0 && w.rowFactory.getGrouping(w.config.groups)
                }
            }, w.configureColumnWidths = function() {
                var e = [],
                    n = [],
                    t = 0,
                    o = 0,
                    i = {};
                if (angular.forEach(r.columns, function(e, n) {
                        if (!d.isNullOrUndefined(e.originalIndex)) {
                            var t = e.originalIndex;
                            w.config.showSelectionCheckbox && (0 === e.originalIndex && e.visible && (o += 25), t--), i[t] = n
                        }
                    }), angular.forEach(w.config.columnDefs, function(l, a) {
                        var s = r.columns[i[a]];
                        l.index = a;
                        var c, g = !1;
                        if (d.isNullOrUndefined(l.width) ? l.width = "*" : (g = isNaN(l.width) ? d.endsWith(l.width, "%") : !1, c = g ? l.width : parseInt(l.width, 10)), isNaN(c) && !r.hasUserChangedGridColumnWidths) {
                            if (c = l.width, "auto" === c) {
                                s.width = s.minWidth, o += s.width;
                                var u = s;
                                return r.$on("$destroy", r.$on("ngGridEventData", function() {
                                    w.resizeOnData(u)
                                })), void 0
                            }
                            if (-1 !== c.indexOf("*")) return s.visible !== !1 && (t += c.length), e.push(l), void 0;
                            if (g) return n.push(l), void 0;
                            throw 'unable to parse column width, use percentage ("10%","20%", etc...) or "*" to use remaining width of grid'
                        }
                        s.visible !== !1 && (o += s.width = parseInt(s.width, 10))
                    }), n.length > 0) {
                    w.config.maintainColumnRatios = w.config.maintainColumnRatios !== !1;
                    var l = 0,
                        s = 0;
                    angular.forEach(n, function(e) {
                        var n = r.columns[i[e.index]],
                            t = parseFloat(e.width) / 100;
                        l += t, n.visible || (s += t)
                    });
                    var c = l - s;
                    angular.forEach(n, function(e) {
                        var n = r.columns[i[e.index]],
                            t = parseFloat(e.width) / 100;
                        t /= s > 0 ? c : l;
                        var a = w.rootDim.outerWidth * l;
                        n.width = a * t, o += n.width
                    })
                }
                if (e.length > 0) {
                    w.config.maintainColumnRatios = w.config.maintainColumnRatios !== !1;
                    var g = w.rootDim.outerWidth - o;
                    w.maxCanvasHt > r.viewportDimHeight() && (g -= a.ScrollW);
                    var u = Math.floor(g / t);
                    angular.forEach(e, function(n, t) {
                        var l = r.columns[i[n.index]];
                        l.width = u * n.width.length, l.visible !== !1 && (o += l.width);
                        var s = t === e.length - 1;
                        if (s && w.rootDim.outerWidth > o) {
                            var c = w.rootDim.outerWidth - o;
                            w.maxCanvasHt > r.viewportDimHeight() && (c -= a.ScrollW), l.width += c
                        }
                    })
                }
            }, w.init = function() {
                return w.initTemplates().then(function() {
                    r.selectionProvider = new L(w, r, f), r.domAccessProvider = new y(w), w.rowFactory = new D(w, r, a, g, d), w.searchProvider = new R(r, w, c), w.styleProvider = new E(r, w), r.$on("$destroy", r.$watch("configGroups", function(e) {
                        var n = [];
                        angular.forEach(e, function(e) {
                            n.push(e.field || e)
                        }), w.config.groups = n, w.rowFactory.filteredRowsChanged(), r.$emit("ngGridEventGroups", e)
                    }, !0)), r.$on("$destroy", r.$watch("columns", function(e) {
                        r.isColumnResizing || a.RebuildGrid(r, w), r.$emit("ngGridEventColumns", e)
                    }, !0)), r.$on("$destroy", r.$watch(function() {
                        return i.i18n
                    }, function(e) {
                        d.seti18n(r, e)
                    })), w.maxCanvasHt = w.calcMaxCanvasHeight(), w.config.sortInfo.fields && w.config.sortInfo.fields.length > 0 && r.$on("$destroy", r.$watch(function() {
                        return w.config.sortInfo
                    }, function() {
                        l.isSorting || (w.sortColumnsInit(), r.$emit("ngGridEventSorted", w.config.sortInfo))
                    }, !0))
                })
            }, w.resizeOnData = function(e) {
                var t = e.minWidth,
                    o = d.getElementsByClassName("col" + e.index);
                angular.forEach(o, function(e, o) {
                    var r;
                    if (0 === o) {
                        var i = n(e).find(".ngHeaderText");
                        r = d.visualLength(i) + 10
                    } else {
                        var l = n(e).find(".ngCellText");
                        r = d.visualLength(l) + 10
                    }
                    r > t && (t = r)
                }), e.width = e.longest = Math.min(e.maxWidth, t + 7), a.BuildStyles(r, w, !0)
            }, w.lastSortedColumns = [], w.sortData = function(e, t) {
                if (t && t.shiftKey && w.config.sortInfo) {
                    var o = w.config.sortInfo.columns.indexOf(e); - 1 === o ? (1 === w.config.sortInfo.columns.length && (w.config.sortInfo.columns[0].sortPriority = 1), w.config.sortInfo.columns.push(e), e.sortPriority = w.config.sortInfo.columns.length, w.config.sortInfo.fields.push(e.field), w.config.sortInfo.directions.push(e.sortDirection), w.lastSortedColumns.push(e)) : w.config.sortInfo.directions[o] = e.sortDirection
                } else if (!w.config.useExternalSorting || w.config.useExternalSorting && w.config.sortInfo) {
                    var i = n.isArray(e);
                    w.config.sortInfo.columns.length = 0, w.config.sortInfo.fields.length = 0, w.config.sortInfo.directions.length = 0;
                    var l = function(e) {
                        w.config.sortInfo.columns.push(e), w.config.sortInfo.fields.push(e.field), w.config.sortInfo.directions.push(e.sortDirection), w.lastSortedColumns.push(e)
                    };
                    i ? angular.forEach(e, function(e, n) {
                        e.sortPriority = n + 1, l(e)
                    }) : (w.clearSortingData(e), e.sortPriority = void 0, l(e)), w.sortActual(), w.searchProvider.evalFilter(), r.$emit("ngGridEventSorted", w.config.sortInfo)
                }
            }, w.sortColumnsInit = function() {
                w.config.sortInfo.columns ? w.config.sortInfo.columns.length = 0 : w.config.sortInfo.columns = [];
                var e = [];
                angular.forEach(r.columns, function(n) {
                    var t = w.config.sortInfo.fields.indexOf(n.field); - 1 !== t && (n.sortDirection = w.config.sortInfo.directions[t] || "asc", e[t] = n)
                }), 1 === e.length ? w.sortData(e[0]) : w.sortData(e)
            }, w.sortActual = function() {
                if (!w.config.useExternalSorting) {
                    var e = w.data.slice(0);
                    angular.forEach(e, function(e, n) {
                        var t = w.rowMap[n];
                        if (void 0 !== t) {
                            var o = w.rowCache[t];
                            void 0 !== o && (e.preSortSelected = o.selected, e.preSortIndex = n)
                        }
                    }), l.Sort(w.config.sortInfo, e), angular.forEach(e, function(e, n) {
                        w.rowCache[n].entity = e, w.rowCache[n].selected = e.preSortSelected, w.rowMap[e.preSortIndex] = n, delete e.preSortSelected, delete e.preSortIndex
                    })
                }
            }, w.clearSortingData = function(e) {
                e ? (angular.forEach(w.lastSortedColumns, function(n) {
                    e.index !== n.index && (n.sortDirection = "", n.sortPriority = null)
                }), w.lastSortedColumns[0] = e, w.lastSortedColumns.length = 1) : (angular.forEach(w.lastSortedColumns, function(e) {
                    e.sortDirection = "", e.sortPriority = null
                }), w.lastSortedColumns = [])
            }, w.fixColumnIndexes = function() {
                for (var e = 0; r.columns.length > e; e++) r.columns[e].index = e
            }, w.fixGroupIndexes = function() {
                angular.forEach(r.configGroups, function(e, n) {
                    e.groupIndex = n + 1
                })
            }, r.elementsNeedMeasuring = !0, r.columns = [], r.renderedRows = [], r.renderedColumns = [], r.headerRow = null, r.rowHeight = w.config.rowHeight, r.jqueryUITheme = w.config.jqueryUITheme, r.showSelectionCheckbox = w.config.showSelectionCheckbox, r.enableCellSelection = w.config.enableCellSelection, r.enableCellEditOnFocus = w.config.enableCellEditOnFocus, r.footer = null, r.selectedItems = w.config.selectedItems, r.multiSelect = w.config.multiSelect, r.showFooter = w.config.showFooter, r.footerRowHeight = r.showFooter ? w.config.footerRowHeight : 0, r.showColumnMenu = w.config.showColumnMenu, r.forceSyncScrolling = w.config.forceSyncScrolling, r.showMenu = !1, r.configGroups = [], r.gridId = w.gridId, r.enablePaging = w.config.enablePaging, r.pagingOptions = w.config.pagingOptions, r.i18n = {}, d.seti18n(r, w.config.i18n), r.adjustScrollLeft = function(e) {
                for (var n = 0, t = 0, o = r.columns.length, i = [], l = !w.config.enableColumnHeavyVirt, s = 0, c = function(e) {
                        l ? i.push(e) : r.renderedColumns[s] ? r.renderedColumns[s].setVars(e) : r.renderedColumns[s] = e.copy(), s++
                    }, g = 0; o > g; g++) {
                    var d = r.columns[g];
                    if (d.visible !== !1) {
                        var u = d.width + n;
                        if (d.pinned) {
                            c(d);
                            var f = g > 0 ? e + t : e;
                            a.setColLeft(d, f, w), t += d.width
                        } else u >= e && e + w.rootDim.outerWidth >= n && c(d);
                        n += d.width
                    }
                }
                l && (r.renderedColumns = i)
            }, w.prevScrollTop = 0, w.prevScrollIndex = 0, r.adjustScrollTop = function(e, n) {
                if (w.prevScrollTop !== e || n) {
                    e > 0 && w.$viewport[0].scrollHeight - e <= w.$viewport.outerHeight() && r.$emit("ngGridEventScroll");
                    var i, l = Math.floor(e / w.config.rowHeight);
                    if (w.filteredRows.length > w.config.virtualizationThreshold) {
                        if (e > w.prevScrollTop && w.prevScrollIndex + o > l) return;
                        if (w.prevScrollTop > e && l > w.prevScrollIndex - o) return;
                        i = new I(Math.max(0, l - t), l + w.minRowsToRender() + t)
                    } else {
                        var a = r.configGroups.length > 0 ? w.rowFactory.parsedData.length : w.filteredRows.length;
                        i = new I(0, Math.max(a, w.minRowsToRender() + t))
                    }
                    w.prevScrollTop = e, w.rowFactory.UpdateViewableRange(i), w.prevScrollIndex = l
                }
            }, r.toggleShowMenu = function() {
                r.showMenu = !r.showMenu
            }, r.toggleSelectAll = function(e, n) {
                r.selectionProvider.toggleSelectAll(e, !1, n)
            }, r.totalFilteredItemsLength = function() {
                return w.filteredRows.length
            }, r.showGroupPanel = function() {
                return w.config.showGroupPanel
            }, r.topPanelHeight = function() {
                return w.config.showGroupPanel === !0 ? w.config.headerRowHeight + 32 : w.config.headerRowHeight
            }, r.viewportDimHeight = function() {
                return Math.max(0, w.rootDim.outerHeight - r.topPanelHeight() - r.footerRowHeight - 2)
            }, r.groupBy = function(e) {
                if (!(1 > w.data.length) && e.groupable && e.field) {
                    e.sortDirection || e.sort({
                        shiftKey: r.configGroups.length > 0 ? !0 : !1
                    });
                    var n = r.configGroups.indexOf(e); - 1 === n ? (e.isGroupedBy = !0, r.configGroups.push(e), e.groupIndex = r.configGroups.length) : r.removeGroup(n), w.$viewport.scrollTop(0), a.digest(r)
                }
            }, r.removeGroup = function(e) {
                var n = r.columns.filter(function(n) {
                    return n.groupIndex === e + 1
                })[0];
                n.isGroupedBy = !1, n.groupIndex = 0, r.columns[e].isAggCol && (r.columns.splice(e, 1), r.configGroups.splice(e, 1), w.fixGroupIndexes()), 0 === r.configGroups.length && (w.fixColumnIndexes(), a.digest(r)), r.adjustScrollLeft(0)
            }, r.togglePin = function(e) {
                for (var n = e.index, t = 0, o = 0; r.columns.length > o && r.columns[o].pinned; o++) t++;
                e.pinned && (t = Math.max(e.originalIndex, t - 1)), e.pinned = !e.pinned, r.columns.splice(n, 1), r.columns.splice(t, 0, e), w.fixColumnIndexes(), a.BuildStyles(r, w, !0), w.$viewport.scrollLeft(w.$viewport.scrollLeft() - e.width)
            }, r.totalRowWidth = function() {
                for (var e = 0, n = r.columns, t = 0; n.length > t; t++) n[t].visible !== !1 && (e += n[t].width);
                return e
            }, r.headerScrollerDim = function() {
                var e = r.viewportDimHeight(),
                    n = w.maxCanvasHt,
                    t = n > e,
                    o = new S;
                return o.autoFitHeight = !0, o.outerWidth = r.totalRowWidth(), t ? o.outerWidth += w.elementDims.scrollW : w.elementDims.scrollH >= n - e && (o.outerWidth += w.elementDims.scrollW), o
            }
        },
        I = function(e, n) {
            this.topRow = e, this.bottomRow = n
        },
        $ = function(e, n, t, o, r) {
            this.entity = e, this.config = n, this.selectionProvider = t, this.rowIndex = o, this.utils = r, this.selected = t.getSelection(e), this.cursor = this.config.enableRowSelection && !this.config.selectWithCheckboxOnly ? "pointer" : "default", this.beforeSelectionChange = n.beforeSelectionChangeCallback, this.afterSelectionChange = n.afterSelectionChangeCallback, this.offsetTop = this.rowIndex * n.rowHeight, this.rowDisplayIndex = 0
        };
    $.prototype.setSelection = function(e) {
        this.selectionProvider.setSelection(this, e), this.selectionProvider.lastClickedRow = this
    }, $.prototype.continueSelection = function(e) {
        this.selectionProvider.ChangeSelection(this, e)
    }, $.prototype.ensureEntity = function(e) {
        this.entity !== e && (this.entity = e, this.selected = this.selectionProvider.getSelection(this.entity))
    }, $.prototype.toggleSelected = function(e) {
        if (!this.config.enableRowSelection && !this.config.enableCellSelection) return !0;
        var n = e.target || e;
        return "checkbox" === n.type && "ngSelectionCell ng-scope" !== n.parentElement.className ? !0 : this.config.selectWithCheckboxOnly && "checkbox" !== n.type ? (this.selectionProvider.lastClickedRow = this, !0) : (this.beforeSelectionChange(this, e) && this.continueSelection(e), !1)
    }, $.prototype.alternatingRowClass = function() {
        var e = 0 === this.rowIndex % 2,
            n = {
                ngRow: !0,
                selected: this.selected,
                even: e,
                odd: !e,
                "ui-state-default": this.config.jqueryUITheme && e,
                "ui-state-active": this.config.jqueryUITheme && !e
            };
        return n
    }, $.prototype.getProperty = function(e) {
        return this.utils.evalProperty(this.entity, e)
    }, $.prototype.copy = function() {
        return this.clone = new $(this.entity, this.config, this.selectionProvider, this.rowIndex, this.utils), this.clone.isClone = !0, this.clone.elm = this.elm, this.clone.orig = this, this.clone
    }, $.prototype.setVars = function(e) {
        e.clone = this, this.entity = e.entity, this.selected = e.selected, this.orig = e
    };
    var D = function(e, n, o, r, i) {
            var g = this;
            g.aggCache = {}, g.parentCache = [], g.dataChanged = !0, g.parsedData = [], g.rowConfig = {}, g.selectionProvider = n.selectionProvider, g.rowHeight = 30, g.numberOfAggregates = 0, g.groupedData = void 0, g.rowHeight = e.config.rowHeight, g.rowConfig = {
                enableRowSelection: e.config.enableRowSelection,
                rowClasses: e.config.rowClasses,
                selectedItems: n.selectedItems,
                selectWithCheckboxOnly: e.config.selectWithCheckboxOnly,
                beforeSelectionChangeCallback: e.config.beforeSelectionChange,
                afterSelectionChangeCallback: e.config.afterSelectionChange,
                jqueryUITheme: e.config.jqueryUITheme,
                enableCellSelection: e.config.enableCellSelection,
                rowHeight: e.config.rowHeight
            }, g.renderedRange = new I(0, e.minRowsToRender() + t), g.buildEntityRow = function(e, n) {
                return new $(e, g.rowConfig, g.selectionProvider, n, i)
            }, g.buildAggregateRow = function(n, t) {
                var o = g.aggCache[n.aggIndex];
                return o || (o = new C(n, g, g.rowConfig.rowHeight, e.config.groupsCollapsedByDefault), g.aggCache[n.aggIndex] = o), o.rowIndex = t, o.offsetTop = t * g.rowConfig.rowHeight, o
            }, g.UpdateViewableRange = function(e) {
                g.renderedRange = e, g.renderedChange()
            }, g.filteredRowsChanged = function() {
                e.lateBoundColumns && e.filteredRows.length > 0 && (e.config.columnDefs = void 0, e.buildColumns(), e.lateBoundColumns = !1, n.$evalAsync(function() {
                    n.adjustScrollLeft(0)
                })), g.dataChanged = !0, e.config.groups.length > 0 && g.getGrouping(e.config.groups), g.UpdateViewableRange(g.renderedRange)
            }, g.renderedChange = function() {
                if (!g.groupedData || 1 > e.config.groups.length) return g.renderedChangeNoGroups(), e.refreshDomSizes(), void 0;
                g.wasGrouped = !0, g.parentCache = [];
                var n = 0,
                    t = g.parsedData.filter(function(e) {
                        return e.isAggRow ? e.parent && e.parent.collapsed ? !1 : !0 : (e[s] || (e.rowIndex = n++), !e[s])
                    });
                g.totalRows = t.length;
                for (var o = [], r = g.renderedRange.topRow; g.renderedRange.bottomRow > r; r++) t[r] && (t[r].offsetTop = r * e.config.rowHeight, o.push(t[r]));
                e.setRenderedRows(o)
            }, g.renderedChangeNoGroups = function() {
                for (var n = [], t = g.renderedRange.topRow; g.renderedRange.bottomRow > t; t++) e.filteredRows[t] && (e.filteredRows[t].rowIndex = t, e.filteredRows[t].offsetTop = t * e.config.rowHeight, n.push(e.filteredRows[t]));
                e.setRenderedRows(n)
            }, g.fixRowCache = function() {
                var n = e.data.length,
                    t = n - e.rowCache.length;
                if (0 > t) e.rowCache.length = e.rowMap.length = n;
                else
                    for (var o = e.rowCache.length; n > o; o++) e.rowCache[o] = e.rowFactory.buildEntityRow(e.data[o], o)
            }, g.parseGroupData = function(e) {
                if (e.values)
                    for (var n = 0; e.values.length > n; n++) g.parentCache[g.parentCache.length - 1].children.push(e.values[n]), g.parsedData.push(e.values[n]);
                else
                    for (var t in e)
                        if (t !== l && t !== a && t !== c && e.hasOwnProperty(t)) {
                            var o = g.buildAggregateRow({
                                gField: e[l],
                                gLabel: t,
                                gDepth: e[a],
                                isAggRow: !0,
                                _ng_hidden_: !1,
                                children: [],
                                aggChildren: [],
                                aggIndex: g.numberOfAggregates,
                                aggLabelFilter: e[c].aggLabelFilter
                            }, 0);
                            g.numberOfAggregates++, o.parent = g.parentCache[o.depth - 1], o.parent && (o.parent.collapsed = !1, o.parent.aggChildren.push(o)), g.parsedData.push(o), g.parentCache[o.depth] = o, g.parseGroupData(e[t])
                        }
            }, g.getGrouping = function(t) {
                function d(e, n) {
                    return e.filter(function(e) {
                        return e.field === n
                    })
                }
                g.aggCache = [], g.numberOfAggregates = 0, g.groupedData = {};
                for (var u = e.filteredRows, f = t.length, h = n.columns, p = 0; u.length > p; p++) {
                    var m = u[p].entity;
                    if (!m) return;
                    u[p][s] = e.config.groupsCollapsedByDefault;
                    for (var v = g.groupedData, w = 0; t.length > w; w++) {
                        var C = t[w],
                            S = d(h, C)[0],
                            y = i.evalProperty(m, C);
                        y = y ? "" + y : "null", v[y] || (v[y] = {}), v[l] || (v[l] = C), v[a] || (v[a] = w), v[c] || (v[c] = S), v = v[y]
                    }
                    v.values || (v.values = []), v.values.push(u[p])
                }
                if (h.length > 0)
                    for (var x = 0; t.length > x; x++) !h[x].isAggCol && f >= x && h.splice(0, 0, new b({
                        colDef: {
                            field: "ts",
                            width: 25,
                            sortable: !1,
                            resizable: !1,
                            headerCellTemplate: '<div class="ngAggHeader"></div>',
                            pinned: e.config.pinSelectionCheckbox
                        },
                        enablePinning: e.config.enablePinning,
                        isAggCol: !0,
                        headerRowHeight: e.config.headerRowHeight
                    }, n, e, o, r, i));
                e.fixColumnIndexes(), n.adjustScrollLeft(0), g.parsedData.length = 0, g.parseGroupData(g.groupedData), g.fixRowCache()
            }, e.config.groups.length > 0 && e.filteredRows.length > 0 && g.getGrouping(e.config.groups)
        },
        R = function(e, t, o) {
            var r = this,
                i = [];
            r.extFilter = t.config.filterOptions.useExternalFilter, e.showFilter = t.config.showFilter, e.filterText = "", r.fieldMap = {};
            var l = function(e) {
                    var n = {};
                    for (var t in e) e.hasOwnProperty(t) && (n[t.toLowerCase()] = e[t]);
                    return n
                },
                a = function(e, n, t) {
                    var r;
                    for (var i in n)
                        if (n.hasOwnProperty(i)) {
                            var s = t[i.toLowerCase()];
                            if (!s) continue;
                            var c = n[i];
                            if ("object" != typeof c || c instanceof Date) {
                                var g = null,
                                    d = null;
                                if (s && s.cellFilter && (d = s.cellFilter.split(":"), g = o(d[0])), null !== c && void 0 !== c) {
                                    if ("function" == typeof g) {
                                        var u = "" + g(c, d[1].slice(1, -1));
                                        r = e.regex.test(u)
                                    } else r = e.regex.test("" + c);
                                    if (r) return !0
                                }
                            } else {
                                var f = l(s);
                                if (r = a(e, c, f)) return !0
                            }
                        }
                    return !1
                },
                s = function(e, n) {
                    var t, i = r.fieldMap[e.columnDisplay];
                    if (!i) return !1;
                    var l = i.cellFilter.split(":"),
                        a = i.cellFilter ? o(l[0]) : null,
                        s = n[e.column] || n[i.field.split(".")[0]];
                    if (null === s || void 0 === s) return !1;
                    if ("function" == typeof a) {
                        var c = "" + a("object" == typeof s ? g(s, i.field) : s, l[1]);
                        t = e.regex.test(c)
                    } else t = e.regex.test("object" == typeof s ? "" + g(s, i.field) : "" + s);
                    return t ? !0 : !1
                },
                c = function(e) {
                    for (var n = 0, t = i.length; t > n; n++) {
                        var o, l = i[n];
                        if (o = l.column ? s(l, e) : a(l, e, r.fieldMap), !o) return !1
                    }
                    return !0
                };
            r.evalFilter = function() {
                t.filteredRows = 0 === i.length ? t.rowCache : t.rowCache.filter(function(e) {
                    return c(e.entity)
                });
                for (var e = 0; t.filteredRows.length > e; e++) t.filteredRows[e].rowIndex = e;
                t.rowFactory.filteredRowsChanged()
            };
            var g = function(e, n) {
                    if ("object" != typeof e || "string" != typeof n) return e;
                    var t = n.split("."),
                        o = e;
                    if (t.length > 1) {
                        for (var r = 1, i = t.length; i > r; r++)
                            if (o = o[t[r]], !o) return e;
                        return o
                    }
                    return e
                },
                d = function(e, n) {
                    try {
                        return RegExp(e, n)
                    } catch (t) {
                        return RegExp(e.replace(/(\^|\$|\(|\)|<|>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, "\\$1"))
                    }
                },
                u = function(e) {
                    i = [];
                    var t;
                    if (t = n.trim(e))
                        for (var o = t.split(";"), r = 0; o.length > r; r++) {
                            var l = o[r].split(":");
                            if (l.length > 1) {
                                var a = n.trim(l[0]),
                                    s = n.trim(l[1]);
                                a && s && i.push({
                                    column: a,
                                    columnDisplay: a.replace(/\s+/g, "").toLowerCase(),
                                    regex: d(s, "i")
                                })
                            } else {
                                var c = n.trim(l[0]);
                                c && i.push({
                                    column: "",
                                    regex: d(c, "i")
                                })
                            }
                        }
                };
            r.extFilter || e.$on("$destroy", e.$watch("columns", function(e) {
                for (var n = 0; e.length > n; n++) {
                    var t = e[n];
                    if (t.field)
                        if (t.field.match(/\./g)) {
                            for (var o = t.field.split("."), i = r.fieldMap, l = 0; o.length - 1 > l; l++) i[o[l]] = i[o[l]] || {}, i = i[o[l]];
                            i[o[o.length - 1]] = t
                        } else r.fieldMap[t.field.toLowerCase()] = t;
                    t.displayName && (r.fieldMap[t.displayName.toLowerCase().replace(/\s+/g, "")] = t)
                }
            })), e.$on("$destroy", e.$watch(function() {
                return t.config.filterOptions.filterText
            }, function(n) {
                e.filterText = n
            })), e.$on("$destroy", e.$watch("filterText", function(n) {
                r.extFilter || (e.$emit("ngGridEventFilter", n), u(n), r.evalFilter())
            }))
        },
        L = function(e, n, t) {
            var o = this;
            o.multi = e.config.multiSelect, o.selectedItems = e.config.selectedItems, o.selectedIndex = e.config.selectedIndex, o.lastClickedRow = void 0, o.ignoreSelectedItemChanges = !1, o.pKeyParser = t(e.config.primaryKey), o.ChangeSelection = function(t, r) {
                var i = r.which || r.keyCode,
                    l = 40 === i || 38 === i;
                if (r && r.shiftKey && !r.keyCode && o.multi && e.config.enableRowSelection) {
                    if (o.lastClickedRow) {
                        var a;
                        a = n.configGroups.length > 0 ? e.rowFactory.parsedData.filter(function(e) {
                            return !e.isAggRow
                        }) : e.filteredRows;
                        var s = t.rowIndex,
                            c = o.lastClickedRowIndex;
                        if (s === c) return !1;
                        c > s ? (s ^= c, c = s ^ c, s ^= c, s--) : c++;
                        for (var g = []; s >= c; c++) g.push(a[c]);
                        if (g[g.length - 1].beforeSelectionChange(g, r)) {
                            for (var d = 0; g.length > d; d++) {
                                var u = g[d],
                                    f = u.selected;
                                u.selected = !f, u.clone && (u.clone.selected = u.selected);
                                var h = o.selectedItems.indexOf(u.entity); - 1 === h ? o.selectedItems.push(u.entity) : o.selectedItems.splice(h, 1)
                            }
                            g[g.length - 1].afterSelectionChange(g, r)
                        }
                        return o.lastClickedRow = t, o.lastClickedRowIndex = t.rowIndex, !0
                    }
                } else o.multi ? (!r.keyCode || l && !e.config.selectWithCheckboxOnly) && o.setSelection(t, !t.selected) : o.lastClickedRow === t ? o.setSelection(o.lastClickedRow, e.config.keepLastSelected ? !0 : !t.selected) : (o.lastClickedRow && o.setSelection(o.lastClickedRow, !1), o.setSelection(t, !t.selected));
                return o.lastClickedRow = t, o.lastClickedRowIndex = t.rowIndex, !0
            }, o.getSelection = function(e) {
                return -1 !== o.getSelectionIndex(e)
            }, o.getSelectionIndex = function(n) {
                var t = -1;
                if (e.config.primaryKey) {
                    var r = o.pKeyParser(n);
                    angular.forEach(o.selectedItems, function(e, n) {
                        r === o.pKeyParser(e) && (t = n)
                    })
                } else t = o.selectedItems.indexOf(n);
                return t
            }, o.setSelection = function(n, t) {
                if (e.config.enableRowSelection) {
                    if (t) - 1 === o.getSelectionIndex(n.entity) && (!o.multi && o.selectedItems.length > 0 && o.toggleSelectAll(!1, !0), o.selectedItems.push(n.entity));
                    else {
                        var r = o.getSelectionIndex(n.entity); - 1 !== r && o.selectedItems.splice(r, 1)
                    }
                    n.selected = t, n.orig && (n.orig.selected = t), n.clone && (n.clone.selected = t), n.afterSelectionChange(n)
                }
            }, o.toggleSelectAll = function(n, t, r) {
                var i = r ? e.filteredRows : e.rowCache;
                if (t || e.config.beforeSelectionChange(i, n)) {
                    var l = o.selectedItems.length;
                    l > 0 && (o.selectedItems.length = 0);
                    for (var a = 0; i.length > a; a++) i[a].selected = n, i[a].clone && (i[a].clone.selected = n), n && o.selectedItems.push(i[a].entity);
                    t || e.config.afterSelectionChange(i, n)
                }
            }
        },
        E = function(e, n) {
            e.headerCellStyle = function(e) {
                return {
                    height: e.headerRowHeight + "px"
                }
            }, e.rowStyle = function(n) {
                var t = {
                    top: n.offsetTop + "px",
                    height: e.rowHeight + "px"
                };
                return n.isAggRow && (t.left = n.offsetLeft), t
            }, e.canvasStyle = function() {
                return {
                    height: n.maxCanvasHt + "px"
                }
            }, e.headerScrollerStyle = function() {
                return {
                    height: n.config.headerRowHeight + "px"
                }
            }, e.topPanelStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: e.topPanelHeight() + "px"
                }
            }, e.headerStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: n.config.headerRowHeight + "px"
                }
            }, e.groupPanelStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: "32px"
                }
            }, e.viewportStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: e.viewportDimHeight() + "px"
                }
            }, e.footerStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: e.footerRowHeight + "px"
                }
            }
        };
    m.directive("ngCellHasFocus", ["$domUtilityService", function(e) {
        var n = function(n) {
            n.isFocused = !0, e.digest(n), n.$broadcast("ngGridEventStartCellEdit"), n.$emit("ngGridEventStartCellEdit"), n.$on("$destroy", n.$on("ngGridEventEndCellEdit", function() {
                n.isFocused = !1, e.digest(n)
            }))
        };
        return function(e, t) {
            function o() {
                return e.enableCellEditOnFocus ? c = !0 : t.focus(), !0
            }

            function r(o) {
                e.enableCellEditOnFocus && (o.preventDefault(), c = !1, n(e, t))
            }

            function i() {
                return s = !0, e.enableCellEditOnFocus && !c && n(e, t), !0
            }

            function l() {
                return s = !1, !0
            }

            function a(o) {
                return e.enableCellEditOnFocus || (s && 37 !== o.keyCode && 38 !== o.keyCode && 39 !== o.keyCode && 40 !== o.keyCode && 9 !== o.keyCode && !o.shiftKey && 13 !== o.keyCode && n(e, t), s && o.shiftKey && o.keyCode >= 65 && 90 >= o.keyCode && n(e, t), 27 === o.keyCode && t.focus()), !0
            }
            var s = !1,
                c = !1;
            e.editCell = function() {
                e.enableCellEditOnFocus || setTimeout(function() {
                    n(e, t)
                }, 0)
            }, t.bind("mousedown", o), t.bind("click", r), t.bind("focus", i), t.bind("blur", l), t.bind("keydown", a), t.on("$destroy", function() {
                t.off("mousedown", o), t.off("click", r), t.off("focus", i), t.off("blur", l), t.off("keydown", a)
            })
        }
    }]), m.directive("ngCellText", function() {
        return function(e, n) {
            function t(e) {
                e.preventDefault()
            }

            function o(e) {
                e.preventDefault()
            }
            n.bind("mouseover", t), n.bind("mouseleave", o), n.on("$destroy", function() {
                n.off("mouseover", t), n.off("mouseleave", o)
            })
        }
    }), m.directive("ngCell", ["$compile", "$domUtilityService", function(e, t) {
        var o = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        var r, i = t.col.cellTemplate.replace(d, "row.entity." + t.col.field);
                        t.col.enableCellEdit ? (r = t.col.cellEditTemplate, r = r.replace(h, t.col.cellEditableCondition), r = r.replace(u, i), r = r.replace(f, t.col.editableCellTemplate.replace(d, "row.entity." + t.col.field))) : r = i;
                        var l = n(r);
                        o.append(l), e(l)(t), t.enableCellSelection && -1 === l[0].className.indexOf("ngSelectionCell") && (l[0].setAttribute("tabindex", 0), l.addClass("ngCellElement"))
                    },
                    post: function(e, n) {
                        e.enableCellSelection && e.domAccessProvider.selectionHandlers(e, n), e.$on("$destroy", e.$on("ngGridEventDigestCell", function() {
                            t.digest(e)
                        }))
                    }
                }
            }
        };
        return o
    }]), m.directive("ngEditCellIf", [function() {
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            restrict: "A",
            compile: function(e, n, t) {
                return function(e, n, o) {
                    var r, i;
                    e.$on("$destroy", e.$watch(o.ngEditCellIf, function(o) {
                        r && (r.remove(), r = void 0), i && (i.$destroy(), i = void 0), o && (i = e.$new(), t(i, function(e) {
                            r = e, n.after(e)
                        }))
                    }))
                }
            }
        }
    }]), m.directive("ngGridFooter", ["$compile", "$templateCache", function(e, n) {
        var t = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        0 === o.children().length && o.append(e(n.get(t.gridId + "footerTemplate.html"))(t))
                    }
                }
            }
        };
        return t
    }]), m.directive("ngGridMenu", ["$compile", "$templateCache", function(e, n) {
        var t = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        0 === o.children().length && o.append(e(n.get(t.gridId + "menuTemplate.html"))(t))
                    }
                }
            }
        };
        return t
    }]), m.directive("ngGrid", ["$compile", "$filter", "$templateCache", "$sortService", "$domUtilityService", "$utilityService", "$timeout", "$parse", "$http", "$q", function(e, t, o, r, i, l, a, s, c, g) {
        var d = {
            scope: !0,
            compile: function() {
                return {
                    pre: function(d, u, f) {
                        var h = n(u),
                            p = d.$eval(f.ngGrid);
                        p.gridDim = new S({
                            outerHeight: n(h).height(),
                            outerWidth: n(h).width()
                        });
                        var m = new P(d, p, r, i, t, o, l, a, s, c, g);
                        return d.$on("$destroy", function() {
                            p.gridDim = null, p.selectRow = null, p.selectItem = null, p.selectAll = null, p.selectVisible = null, p.groupBy = null, p.sortBy = null, p.gridId = null, p.ngGrid = null, p.$gridScope = null, p.$gridServices = null, d.domAccessProvider.grid = null, angular.element(m.styleSheet).remove(), m.styleSheet = null
                        }), m.init().then(function() {
                            if ("string" == typeof p.columnDefs ? d.$on("$destroy", d.$parent.$watch(p.columnDefs, function(e) {
                                    return e ? (m.lateBoundColumns = !1, d.columns = [], m.config.columnDefs = e, m.buildColumns(), m.eventProvider.assignEvents(), i.RebuildGrid(d, m), void 0) : (m.refreshDomSizes(), m.buildColumns(), void 0)
                                }, !0)) : m.buildColumns(), "string" == typeof p.totalServerItems ? d.$on("$destroy", d.$parent.$watch(p.totalServerItems, function(e) {
                                    d.totalServerItems = angular.isDefined(e) ? e : 0
                                })) : d.totalServerItems = 0, "string" == typeof p.data) {
                                var t = function(e) {
                                    m.data = n.extend([], e), m.rowFactory.fixRowCache(), angular.forEach(m.data, function(e, n) {
                                        var t = m.rowMap[n] || n;
                                        m.rowCache[t] && m.rowCache[t].ensureEntity(e), m.rowMap[t] = n
                                    }), m.searchProvider.evalFilter(), m.configureColumnWidths(), m.refreshDomSizes(), m.config.sortInfo.fields.length > 0 && (m.sortColumnsInit(), d.$emit("ngGridEventSorted", m.config.sortInfo)), d.$emit("ngGridEventData", m.gridId)
                                };
                                d.$on("$destroy", d.$parent.$watch(p.data, t)), d.$on("$destroy", d.$parent.$watch(p.data + ".length", function() {
                                    t(d.$eval(p.data)), d.adjustScrollTop(m.$viewport.scrollTop(), !0)
                                }))
                            }
                            return m.footerController = new T(d, m), u.addClass("ngGrid").addClass("" + m.gridId), p.enableHighlighting || u.addClass("unselectable"), p.jqueryUITheme && u.addClass("ui-widget"), u.append(e(o.get("gridTemplate.html"))(d)), i.AssignGridContainers(d, u, m), m.eventProvider = new x(m, d, i, a), p.selectRow = function(e, n) {
                                m.rowCache[e] && (m.rowCache[e].clone && m.rowCache[e].clone.setSelection(n ? !0 : !1), m.rowCache[e].setSelection(n ? !0 : !1))
                            }, p.selectItem = function(e, n) {
                                p.selectRow(m.rowMap[e], n)
                            }, p.selectAll = function(e) {
                                d.toggleSelectAll(e)
                            }, p.selectVisible = function(e) {
                                d.toggleSelectAll(e, !0)
                            }, p.groupBy = function(e) {
                                if (e) d.groupBy(d.columns.filter(function(n) {
                                    return n.field === e
                                })[0]);
                                else {
                                    var t = n.extend(!0, [], d.configGroups);
                                    angular.forEach(t, d.groupBy)
                                }
                            }, p.sortBy = function(e) {
                                var n = d.columns.filter(function(n) {
                                    return n.field === e
                                })[0];
                                n && n.sort()
                            }, p.gridId = m.gridId, p.ngGrid = m, p.$gridScope = d, p.$gridServices = {
                                SortService: r,
                                DomUtilityService: i,
                                UtilityService: l
                            }, d.$on("$destroy", d.$on("ngGridEventDigestGrid", function() {
                                i.digest(d.$parent)
                            })), d.$on("$destroy", d.$on("ngGridEventDigestGridParent", function() {
                                i.digest(d.$parent)
                            })), d.$evalAsync(function() {
                                d.adjustScrollLeft(0)
                            }), angular.forEach(p.plugins, function(e) {
                                "function" == typeof e && (e = new e);
                                var n = d.$new();
                                e.init(n, m, p.$gridServices), p.plugins[l.getInstanceType(e)] = e, d.$on("$destroy", function() {
                                    n.$destroy()
                                })
                            }), "function" == typeof p.init && p.init(m, d), null
                        })
                    }
                }
            }
        };
        return d
    }]), m.directive("ngHeaderCell", ["$compile", function(e) {
        var n = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(n, t) {
                        t.append(e(n.col.headerCellTemplate)(n))
                    }
                }
            }
        };
        return n
    }]), m.directive("ngHeaderRow", ["$compile", "$templateCache", function(e, n) {
        var t = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        0 === o.children().length && o.append(e(n.get(t.gridId + "headerRowTemplate.html"))(t))
                    }
                }
            }
        };
        return t
    }]), m.directive("ngInput", [function() {
        return {
            require: "ngModel",
            link: function(e, n, t, o) {
                function r(t) {
                    switch (t.keyCode) {
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            t.stopPropagation();
                            break;
                        case 27:
                            e.$$phase || e.$apply(function() {
                                o.$setViewValue(a), n.blur()
                            });
                            break;
                        case 13:
                            (e.enableCellEditOnFocus && e.totalFilteredItemsLength() - 1 > e.row.rowIndex && e.row.rowIndex > 0 || e.col.enableCellEdit) && n.blur()
                    }
                    return !0
                }

                function i(e) {
                    e.stopPropagation()
                }

                function l(e) {
                    e.stopPropagation()
                }
                var a, s = e.$watch("ngModel", function() {
                    a = o.$modelValue, s()
                });
                n.bind("keydown", r), n.bind("click", i), n.bind("mousedown", l), n.on("$destroy", function() {
                    n.off("keydown", r), n.off("click", i), n.off("mousedown", l)
                }), e.$on("$destroy", e.$on("ngGridEventStartCellEdit", function() {
                    n.focus(), n.select()
                })), angular.element(n).bind("blur", function() {
                    e.$emit("ngGridEventEndCellEdit")
                })
            }
        }
    }]), m.directive("ngRow", ["$compile", "$domUtilityService", "$templateCache", function(e, n, t) {
        var o = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(o, r) {
                        if (o.row.elm = r, o.row.clone && (o.row.clone.elm = r), o.row.isAggRow) {
                            var i = t.get(o.gridId + "aggregateTemplate.html");
                            i = o.row.aggLabelFilter ? i.replace(g, "| " + o.row.aggLabelFilter) : i.replace(g, ""), r.append(e(i)(o))
                        } else r.append(e(t.get(o.gridId + "rowTemplate.html"))(o));
                        o.$on("$destroy", o.$on("ngGridEventDigestRow", function() {
                            n.digest(o)
                        }))
                    }
                }
            }
        };
        return o
    }]), m.directive("ngViewport", [function() {
        return function(e, n) {
            function t(n) {
                var t = n.target.scrollLeft,
                    o = n.target.scrollTop;
                return e.$headerContainer && e.$headerContainer.scrollLeft(t), e.adjustScrollLeft(t), e.adjustScrollTop(o), e.forceSyncScrolling ? s() : (clearTimeout(l), l = setTimeout(s, 150)), i = t, a = o, r = !1, !0
            }

            function o() {
                return r = !0, n.focus && n.focus(), !0
            }
            var r, i, l, a = 0,
                s = function() {
                    e.$root.$$phase || e.$digest()
                };
            n.bind("scroll", t), n.bind("mousewheel DOMMouseScroll", o), n.on("$destroy", function() {
                n.off("scroll", t), n.off("mousewheel DOMMouseScroll", o)
            }), e.enableCellSelection || e.domAccessProvider.selectionHandlers(e, n)
        }
    }]), e.ngGrid.i18n.da = {
        ngAggregateLabel: "artikler",
        ngGroupPanelDescription: "Grupér rækker udfra en kolonne ved at trække dens overskift hertil.",
        ngSearchPlaceHolder: "Søg...",
        ngMenuText: "Vælg kolonner:",
        ngShowingItemsLabel: "Viste rækker:",
        ngTotalItemsLabel: "Rækker totalt:",
        ngSelectedItemsLabel: "Valgte rækker:",
        ngPageSizeLabel: "Side størrelse:",
        ngPagerFirstTitle: "Første side",
        ngPagerNextTitle: "Næste side",
        ngPagerPrevTitle: "Forrige side",
        ngPagerLastTitle: "Sidste side"
    }, e.ngGrid.i18n.de = {
        ngAggregateLabel: "eintrag",
        ngGroupPanelDescription: "Ziehen Sie eine Spaltenüberschrift hierhin um nach dieser Spalte zu gruppieren.",
        ngSearchPlaceHolder: "Suche...",
        ngMenuText: "Spalten auswählen:",
        ngShowingItemsLabel: "Zeige Einträge:",
        ngTotalItemsLabel: "Einträge gesamt:",
        ngSelectedItemsLabel: "Ausgewählte Einträge:",
        ngPageSizeLabel: "Einträge pro Seite:",
        ngPagerFirstTitle: "Erste Seite",
        ngPagerNextTitle: "Nächste Seite",
        ngPagerPrevTitle: "Vorherige Seite",
        ngPagerLastTitle: "Letzte Seite"
    }, e.ngGrid.i18n.en = {
        ngAggregateLabel: "items",
        ngGroupPanelDescription: "Drag a column header here and dropto group by that column.",
        ngSearchPlaceHolder: "Search...",
        ngMenuText: "Choose Columns:",
        ngShowingItemsLabel: "Showing Items:",
        ngTotalItemsLabel: "Total Items:",
        ngSelectedItemsLabel: "Selected Items:",
        ngPageSizeLabel: "Page Size:",
        ngPagerFirstTitle: "First Page",
        ngPagerNextTitle: "Next Page",
        ngPagerPrevTitle: "Previous Page",
        ngPagerLastTitle: "Last Page"
    }, e.ngGrid.i18n.es = {
        ngAggregateLabel: "Artículos",
        ngGroupPanelDescription: "Arrastre un encabezado de columna aquí y soltarlo para agrupar por esa columna.",
        ngSearchPlaceHolder: "Buscar...",
        ngMenuText: "Elegir columnas:",
        ngShowingItemsLabel: "Artículos Mostrando:",
        ngTotalItemsLabel: "Artículos Totales:",
        ngSelectedItemsLabel: "Artículos Seleccionados:",
        ngPageSizeLabel: "Tamaño de Página:",
        ngPagerFirstTitle: "Primera Página",
        ngPagerNextTitle: "Página Siguiente",
        ngPagerPrevTitle: "Página Anterior",
        ngPagerLastTitle: "Última Página"
    }, e.ngGrid.i18n.fa = {
        ngAggregateLabel: "موردها",
        ngGroupPanelDescription: "یک عنوان ستون اینجا را بردار و به گروهی از آن ستون بیانداز.",
        ngSearchPlaceHolder: "جستجو...",
        ngMenuText: "انتخاب ستون‌ها:",
        ngShowingItemsLabel: "نمایش موردها:",
        ngTotalItemsLabel: "همهٔ موردها:",
        ngSelectedItemsLabel: "موردهای انتخاب‌شده:",
        ngPageSizeLabel: "اندازهٔ صفحه:",
        ngPagerFirstTitle: "صفحهٔ اول",
        ngPagerNextTitle: "صفحهٔ بعد",
        ngPagerPrevTitle: "صفحهٔ قبل",
        ngPagerLastTitle: "آخرین صفحه"
    }, e.ngGrid.i18n.fr = {
        ngAggregateLabel: "articles",
        ngGroupPanelDescription: "Faites glisser un en-tête de colonne ici et déposez-le vers un groupe par cette colonne.",
        ngSearchPlaceHolder: "Recherche...",
        ngMenuText: "Choisir des colonnes:",
        ngShowingItemsLabel: "Articles Affichage des:",
        ngTotalItemsLabel: "Nombre total d'articles:",
        ngSelectedItemsLabel: "Éléments Articles:",
        ngPageSizeLabel: "Taille de page:",
        ngPagerFirstTitle: "Première page",
        ngPagerNextTitle: "Page Suivante",
        ngPagerPrevTitle: "Page précédente",
        ngPagerLastTitle: "Dernière page"
    }, e.ngGrid.i18n.nl = {
        ngAggregateLabel: "items",
        ngGroupPanelDescription: "Sleep hier een kolomkop om op te groeperen.",
        ngSearchPlaceHolder: "Zoeken...",
        ngMenuText: "Kies kolommen:",
        ngShowingItemsLabel: "Toon items:",
        ngTotalItemsLabel: "Totaal items:",
        ngSelectedItemsLabel: "Geselecteerde items:",
        ngPageSizeLabel: "Pagina grootte:, ",
        ngPagerFirstTitle: "Eerste pagina",
        ngPagerNextTitle: "Volgende pagina",
        ngPagerPrevTitle: "Vorige pagina",
        ngPagerLastTitle: "Laatste pagina"
    }, e.ngGrid.i18n["pt-br"] = {
        ngAggregateLabel: "itens",
        ngGroupPanelDescription: "Arraste e solte uma coluna aqui para agrupar por essa coluna",
        ngSearchPlaceHolder: "Procurar...",
        ngMenuText: "Selecione as colunas:",
        ngShowingItemsLabel: "Mostrando os Itens:",
        ngTotalItemsLabel: "Total de Itens:",
        ngSelectedItemsLabel: "Items Selecionados:",
        ngPageSizeLabel: "Tamanho da Página:",
        ngPagerFirstTitle: "Primeira Página",
        ngPagerNextTitle: "Próxima Página",
        ngPagerPrevTitle: "Página Anterior",
        ngPagerLastTitle: "Última Página"
    }, e.ngGrid.i18n["zh-cn"] = {
        ngAggregateLabel: "条目",
        ngGroupPanelDescription: "拖曳表头到此处以进行分组",
        ngSearchPlaceHolder: "搜索...",
        ngMenuText: "数据分组与选择列：",
        ngShowingItemsLabel: "当前显示条目：",
        ngTotalItemsLabel: "条目总数：",
        ngSelectedItemsLabel: "选中条目：",
        ngPageSizeLabel: "每页显示数：",
        ngPagerFirstTitle: "回到首页",
        ngPagerNextTitle: "下一页",
        ngPagerPrevTitle: "上一页",
        ngPagerLastTitle: "前往尾页"
    }, e.ngGrid.i18n["zh-tw"] = {
        ngAggregateLabel: "筆",
        ngGroupPanelDescription: "拖拉表頭到此處以進行分組",
        ngSearchPlaceHolder: "搜尋...",
        ngMenuText: "選擇欄位：",
        ngShowingItemsLabel: "目前顯示筆數：",
        ngTotalItemsLabel: "總筆數：",
        ngSelectedItemsLabel: "選取筆數：",
        ngPageSizeLabel: "每頁顯示：",
        ngPagerFirstTitle: "第一頁",
        ngPagerNextTitle: "下一頁",
        ngPagerPrevTitle: "上一頁",
        ngPagerLastTitle: "最後頁"
    }, angular.module("ngGrid").run(["$templateCache", function(e) {
        e.put("aggregateTemplate.html", '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate">\r\n    <span class="ngAggregateText">{{row.label CUSTOM_FILTERS}} ({{row.totalChildren()}} {{AggItemsLabel}})</span>\r\n    <div class="{{row.aggClass()}}"></div>\r\n</div>\r\n'), e.put("cellEditTemplate.html", '<div ng-cell-has-focus ng-dblclick="CELL_EDITABLE_CONDITION && editCell()">\r\n	<div ng-edit-cell-if="!(isFocused && CELL_EDITABLE_CONDITION)">	\r\n		DISPLAY_CELL_TEMPLATE\r\n	</div>\r\n	<div ng-edit-cell-if="isFocused && CELL_EDITABLE_CONDITION">\r\n		EDITABLE_CELL_TEMPLATE\r\n	</div>\r\n</div>\r\n'), e.put("cellTemplate.html", '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD CUSTOM_FILTERS}}</span></div>'), e.put("checkboxCellTemplate.html", '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'), e.put("checkboxHeaderTemplate.html", '<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected, true)"/>'), e.put("editableCellTemplate.html", '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" />'), e.put("footerTemplate.html", '<div ng-show="showFooter" class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()">\r\n    <div class="ngTotalSelectContainer" >\r\n        <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}" >\r\n            <span class="ngLabel">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show="filterText.length > 0" class="ngLabel">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>\r\n        </div>\r\n        <div class="ngFooterSelectedItems" ng-show="multiSelect">\r\n            <span class="ngLabel">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>\r\n        </div>\r\n    </div>\r\n    <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}">\r\n        <div style="float:left; margin-right: 10px;" class="ngRowCountPicker">\r\n            <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span>\r\n            <select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize" >\r\n                <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>\r\n            </select>\r\n        </div>\r\n        <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl" style="float: left; min-width: 135px;">\r\n            <button type="button" class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"><div class="ngPagerFirstTriangle"><div class="ngPagerFirstBar"></div></div></button>\r\n            <button type="button" class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerPrevTitle}}"><div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div></button>\r\n            <input class="ngPagerCurrent" min="1" max="{{currentMaxPages}}" type="number" style="width:50px; height: 24px; margin-top: 1px; padding: 0 4px;" ng-model="pagingOptions.currentPage"/>\r\n            <span class="ngGridMaxPagesNumber" ng-show="maxPages() > 0">/ {{maxPages()}}</span>\r\n            <button type="button" class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()" title="{{i18n.ngPagerNextTitle}}"><div class="ngPagerLastTriangle ngPagerNextTriangle"></div></button>\r\n            <button type="button" class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"><div class="ngPagerLastTriangle"><div class="ngPagerLastBar"></div></div></button>\r\n        </div>\r\n    </div>\r\n</div>\r\n'), e.put("gridTemplate.html", '<div class="ngTopPanel" ng-class="{\'ui-widget-header\':jqueryUITheme, \'ui-corner-top\': jqueryUITheme}" ng-style="topPanelStyle()">\r\n    <div class="ngGroupPanel" ng-show="showGroupPanel()" ng-style="groupPanelStyle()">\r\n        <div class="ngGroupPanelDescription" ng-show="configGroups.length == 0">{{i18n.ngGroupPanelDescription}}</div>\r\n        <ul ng-show="configGroups.length > 0" class="ngGroupList">\r\n            <li class="ngGroupItem" ng-repeat="group in configGroups">\r\n                <span class="ngGroupElement">\r\n                    <span class="ngGroupName">{{group.displayName}}\r\n                        <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span>\r\n                    </span>\r\n                    <span ng-hide="$last" class="ngGroupArrow"></span>\r\n                </span>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class="ngHeaderContainer" ng-style="headerStyle()">\r\n        <div ng-header-row class="ngHeaderScroller" ng-style="headerScrollerStyle()"></div>\r\n    </div>\r\n    <div ng-grid-menu></div>\r\n</div>\r\n<div class="ngViewport" unselectable="on" ng-viewport ng-class="{\'ui-widget-content\': jqueryUITheme}" ng-style="viewportStyle()">\r\n    <div class="ngCanvas" ng-style="canvasStyle()">\r\n        <div ng-style="rowStyle(row)" ng-repeat="row in renderedRows" ng-click="row.toggleSelected($event)" ng-class="row.alternatingRowClass()" ng-row></div>\r\n    </div>\r\n</div>\r\n<div ng-grid-footer></div>\r\n'), e.put("headerCellTemplate.html", '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !col.noSortVisible() }">\r\n    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>\r\n    <div class="ngSortButtonDown" ng-click="col.sort($event)" ng-show="col.showSortButtonDown()"></div>\r\n    <div class="ngSortButtonUp" ng-click="col.sort($event)" ng-show="col.showSortButtonUp()"></div>\r\n    <div class="ngSortPriority">{{col.sortPriority}}</div>\r\n    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div>\r\n</div>\r\n<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>\r\n'), e.put("headerRowTemplate.html", '<div ng-style="{ height: col.headerRowHeight }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngHeaderCell">\r\n	<div class="ngVerticalBar" ng-style="{height: col.headerRowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>\r\n	<div ng-header-cell></div>\r\n</div>'), e.put("menuTemplate.html", '<div ng-show="showColumnMenu || showFilter"  class="ngHeaderButton" ng-click="toggleShowMenu()">\r\n    <div class="ngHeaderButtonArrow"></div>\r\n</div>\r\n<div ng-show="showMenu" class="ngColMenu">\r\n    <div ng-show="showFilter">\r\n        <input placeholder="{{i18n.ngSearchPlaceHolder}}" type="text" ng-model="filterText"/>\r\n    </div>\r\n    <div ng-show="showColumnMenu">\r\n        <span class="ngMenuText">{{i18n.ngMenuText}}</span>\r\n        <ul class="ngColList">\r\n            <li class="ngColListItem" ng-repeat="col in columns | ngColumns">\r\n                <label><input ng-disabled="col.pinned" type="checkbox" class="ngColListCheckbox" ng-model="col.visible"/>{{col.displayName}}</label>\r\n				<a title="Group By" ng-class="col.groupedByClass()" ng-show="col.groupable && col.visible" ng-click="groupBy(col)"></a>\r\n				<span class="ngGroupingNumber" ng-show="col.groupIndex > 0">{{col.groupIndex}}</span>          \r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>'), e.put("rowTemplate.html", '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}">\r\n	<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>\r\n	<div ng-cell></div>\r\n</div>')
    }])
})(window, jQuery);