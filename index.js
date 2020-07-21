var degree = 1800;
var clicks = 0;

//Clear interval timer if id saved in attributes:
function clear_interval(t) {
	var interval = parseInt(t.data("interval"));
	if (interval > 0) {
		clearInterval(interval);
		t.data("interval", "");
	}
}

$(document).ready(function () {
	$("#spin").click(function () {
		clicks++;
		var newDegree = degree * clicks;
		var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
		totalDegree = newDegree + extraDegree;
		console.log("[newDegree]", newDegree);
		console.log("[extraDegree]", extraDegree);
		console.log("[totalDegree]", totalDegree);
		//Calculate result index:
		var win_num = 6 - Math.floor(((totalDegree % 360) + 30) / 60);
		$(".food-list_wrap .item").removeClass("active");

		$("#wheel .sec").each(function () {
			var t = $(this);

			clear_interval(t);

			// Save timer ID in data-interval attribute:
			t.data(
				"interval",
				setInterval(function () {
					var aoY = t.offset().top;
					$("#txt").html(t.html());
					if (aoY < 23.89) {
						$("#spin").addClass("spin");
						setTimeout(function () {
							$("#spin").removeClass("spin");
						}, 100);
					}
				}, 10)
			);

			$("#inner-wheel").css({
				transform: "rotate(" + totalDegree + "deg)",
			});
		});

		//Stop updates and show result when transition already ended:
		setTimeout(function () {
			$("#wheel .sec").each(function () {
				clear_interval($(this));
			});
			switch (win_num) {
				case 0:
					$(".item.comphan").addClass("active");
					break;
				case 1:
					$(".item.bunbo").addClass("active");
					break;
				case 2:
					$(".item.bunthitnuong").addClass("active");
					break;
				case 3:
					$(".item.comtam").addClass("active");
					break;
				case 5:
					$(".item.comga").addClass("active");
					break;
				case 4:
					$(".item.bone").addClass("active");
					break;

				default:
					break;
			}
		}, 6100);
	});
});
