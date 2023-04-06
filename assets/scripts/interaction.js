function updateInteractionTab() {
	downloadInteractionData = [];
	asyncJsonReq({
		url : restHost+"REST/interaction/interaction?caller=RxNav&rxcui=" + encodeURIComponent(globalRxcui) + "&sources=" + encodeURIComponent(selectedDiSource),
		success : function(data) {
			if (exists(data) && isArray(data.interactionTypeGroup)) {
				enableTabs("intrTabCtrl");
				$("#interDropDown select").html("");
				var interactionTypeGroup = data.interactionTypeGroup;
				var interactionType = interactionTypeGroup[0].interactionType;
				var tableContent = "";
				var selectContent = "";

				// now update interaction tables
				var shownRxcui = "";
				for (var it = 0; it < interactionType.length; it++) {

					var interactionPair = interactionType[it].interactionPair;
					var ingredientDrugName = interactionPair[0].interactionConcept[0].minConceptItem.name;
					var ingredientDrugRxcui = interactionPair[0].interactionConcept[0].minConceptItem.rxcui;
					selectContent += "<option value='" + encodeEntities(ingredientDrugRxcui) + "'>" 
						+ interactionPair.length + ' interacting drugs for ' + ingredientDrugName + "</option>";
					if (it == 0) {
						shownRxcui = ingredientDrugRxcui;
					}
					tableContent += "<div class='interTableClass' id='tableLinkfor"
							+ encodeEntities(ingredientDrugRxcui)
							+ "'><table class='table table-striped centerTablesClass'>"
							+ "<thead><tr>"
							+ "<th>NAME</th><th>SEVERITY</th><th>DESCRIPTION</th></tr></thead><tbody>";
					for (var i = 0; i < interactionPair.length; i++) {

						var apair = interactionPair[i];
						var des = apair.description;
						var severity = apair.severity;
						var minConcept = apair.interactionConcept[1].minConceptItem;
						var rxcui = minConcept.rxcui;
						var name = minConcept.name;

						tableContent += "<tr tabindex='0' class='interactionRow' data-toggle='tooltip' data-placement='top' title='"
								+ encodeEntities(rxcui)
								+ "' id='irxcui|" + encodeEntities(rxcui)
								+ "'><td>" + encodeEntities(name)
								+ "</td><td>" + encodeEntities(severity)
								+ "</td><td>" + encodeEntities(des)
								+ "</td></tr>";

						downloadInteractionData.push(new InteractionData(
							ingredientDrugRxcui, rxcui,
							name, severity, des));
					}
					tableContent += "</tbody></table></div>";

				}

				$("#interDropDown select").html(selectContent);
				$("#interMainContent").html(tableContent);

				$(".interTableClass").hide();
				$("#tableLinkfor" + shownRxcui).show();

				// if (interactionType.length > 1) {
				$("#interDropDown").show();
				$("#interDropDown").css("padding-top", "5px");
				$("#interDropDown").css("height", "auto");
				$("#interDropDown").css("margin-bottom", "10px");
				// add action on click dropdown

			        $("#interDropDown select").on("change", function() {
					shownRxcui = $(this).val().trim();
					$(".interTableClass").hide();
					$("#tableLinkfor" + shownRxcui).show();
				});

				// } else {
				// $("#interDropDown").hide();
				// $("#interDropDown").css("padding-top", "0px");
				// $("#interDropDown").css("height", "0");
				// $("#interDropDown").css("margin-bottom", "0");
				// }

			        $(".interactionRow").on("hover", function() {
					$(this).css("cursor", "pointer").css("background-color", "#94EECA");
				});
				$('tr[data-toggle="tooltip"]').tooltip({
					container : '#interMainContent'// this is important
				});

				registerTableSorterClass("table table-striped centerTablesClass");
				registerClickInteraction();
				registerEnterKeyPressInteraction();

			} else {
				$("#interDropDown").hide();
				$("#interMainContent").html("There is no interaction for selected source");
				var hasOutput = hasOtherInteractionTab();
				if (!hasOutput) {
					disableTabs("intrTabCtrl");
					if (currentTab == 'intrTabCtrl') {
						$('[href=#graph]').tab('show');
						$('#intrTabCtrl').removeClass('currentTabColor');
						$('#graphTabCtrl').addClass('currentTabColor');
						currentTab = "graphTabCtrl";
					}
				} else {
					enableTabs("intrTabCtrl");
				}
			}
		}
	});
}

function hasOtherInteractionTab() {
	var otherSource = "drugbank";
	if (selectedDiSource.toLowerCase() == "drugbank") {
		otherSource = "onchigh";
	}
	var hasOutput = false;
	synJsonReq({
		url : restHost+"REST/interaction/interaction?caller=RxNav&rxcui=" + encodeURIComponent(globalRxcui) + "&sources=" + encodeURIComponent(otherSource),
		success : function(data) {
			if (exists(data) && isArray(data.interactionTypeGroup)) {
				hasOutput = true;
			}
		}
	});
	return hasOutput;
}

function registerEnterKeyPressInteraction() {
	$("tr.interactionRow").keydown(function(event) {
		var key = event.key;
		if (key === 'Enter') { // Enter
			globalRxcui = $(this).attr('id').split("|")[1];// second
			search("RXCUI", globalRxcui, true);
			return;
		}

		if (key === 'Escape'){ //Escape 
			$("#nlm-footer").find("a:first").focus();
			return;
		}

		if (key === 'Home') {
			event.preventDefault();
			$(this).parent().find('tr.interactionRow:first').focus();
			return;
		}

		if (key === 'End') {
			event.preventDefault();
			$(this).parent().find('tr.interactionRow:last').focus();
			return;
		}
	});
}

function registerClickInteraction() {
	$("tr.interactionRow").single_double_click(function() {
		globalRxcui = $(this).attr('id').split("|")[1];// second
		search("RXCUI", globalRxcui, true);
	});
}