(function () {
    console.log($);

    var player1Name = "Player 1";
    var player2Name = "Player 2";
    var resetButton = $("#reset");
    var newGameButton = $("#newGame");
    var startButton = $("#start");
    var num;
    var rowNumber;
    var currentRowNumber;
    var checkRowNumberDown;
    var checkRowNumberUp;
    var checkRowNumberRight;
    var checkRowNumberLeft;
    var checkRowNumberDiagonallyRightUp;
    var checkRowNumberDiagonallyRightDown;
    var checkRowNumberDiagonallyLeftUp;
    var checkRowNumberDiagonallyLeftDown;
    var columnNumber;
    var currentColumnNumber;
    var checkColumnNumberDown;
    var checkColumnNumberUp;
    var checkColumnNumberRight;
    var checkColumnNumberLeft;
    var checkColumnNumberDiagonallyRightUp;
    var checkColumnNumberDiagonallyRightDown;
    var checkColumnNumberDiagonallyLeftUp;
    var checkColumnNumberDiagonallyLeftDown;
    var rowBottom;
    var rowTop;
    var rows = 6;
    var columns = 7;
    var checkNumDown;
    var checkNumUp;
    var checkNumRight;
    var checkNumLeft;
    var checkNumDiagonallyRightUp;
    var checkNumDiagonallyRightDown;
    var checkNumDiagonallyLeftUp;
    var checkNumDiagonallyLeftDown;
    var startingNumber;
    var winCondition = 4;
    var winArrayVertically = [];
    var winArrayHorizontallyL = [];
    var winArrayHorizontallyR = [];
    var winArrayDiagonallyR = [];
    var winArrayDiagonallyL = [];
    var currentPlayer = "player1";
    var slotHtml = "";
    var scorePlayer1 = 0;
    var scorePlayer2 = 0;
    var currentPlayerName = player1Name;
    currentRowNumber = num % rows;

    var currentColumnNumberD;
    var startingNumberD;
    var currentRowNumberDRD;
    var currentColumnNumberDRD;
    var currentRowNumberU;
    var currentColumnNumberU;
    var currentRowNumberL;
    var currentColumnNumberL;
    var currentRowNumberR;
    var currentColumnNumberR;
    var currentRowNumberDRU;
    var currentColumnNumberDRU;

    var currentRowNumberDLU;
    var currentColumnNumberDLU;
    var currentRowNumberDLD;
    var currentColumnNumberDLD;

    var numberOfSlots = rows * columns;

    var activeGame = false;

    $("#game").toggle();
    $("#newGame").toggle();

    resetSlider();

    $("#columns").on("click ready change", function () {
        $("#columnsRange").text(
            `How many columns would you like to have? Columns: ${$(
                "#columns"
            ).val()}`
        );
    });
    $("#rows").on("click ready change", function () {
        $("#rowsRange").text(
            `How many rows would you like to have? Rows: ${$("#rows").val()}`
        );
    });
    $("#winCondition").on("click ready change", function () {
        $("#winconditionText").text(
            `How many connected pieces are required for a win? Length: ${$(
                "#winCondition"
            ).val()}`
        );
    });

    resetButton.on("click", function () {
        if (activeGame) {
            for (var i = 0; i < numberOfSlots; i++) {
                $(".hole").eq(i).removeClass("player1");
                $(".hole").eq(i).removeClass("player2");
            }
            winArrayHorizontallyR = [];
            winArrayHorizontallyL = [];
            winArrayVertically = [];
            winArrayDiagonallyR = [];
            winArrayDiagonallyL = [];
            scorePlayer1 = 0;
            scorePlayer2 = 0;
            $("#player1Score").html("0");
            $("#player2Score").html("0");
            currentPlayer = "player1";
            $("#game").toggle(800);
            rows = 6;
            columns = 7;
            winCondition = 4;
            $("#columns").val(columns);
            $("#rows").val(rows);
            $("#winCondition").val(winCondition);
            numberOfSlots = rows * columns;
            player1Name = "Player 1";
            player2Name = "Player 2";
            $("#Player1Name").html(player1Name);
            $("#Player2Name").html(player2Name);
            $("#player1Name").val("");
            $("#player2Name").val("");
            $("#rows").val("");
            $("#columns").val("");
            $("#winCondition").val("");
            slotHtml = "";
            $("#inputs").toggle(800);
            $("#winMessage").html("");
            $("#winMessage").css("border", "none");
            $("#newGame").toggle();
            $("#favicon").toggle();
            $(".hole").removeClass("winner");
            $("#Player1Name").removeClass("winnerText");
            $("#Player2Name").removeClass("winnerText");
            startButton.toggle();
            $("#columns").val(columns);
            $("#rows").val(rows);
            $("#winCondition").val(winCondition);
            resetSlider();
        }
        activeGame = false;
    });

    newGameButton.on("click", function () {
        activeGame = true;
        $(".hole").off("click");

        for (var i = 0; i < numberOfSlots; i++) {
            $(".hole").eq(i).removeClass("player1");
            $(".hole").eq(i).removeClass("player2");
        }
        winArrayHorizontallyR = [];
        winArrayHorizontallyL = [];
        winArrayVertically = [];
        winArrayDiagonallyR = [];
        winArrayDiagonallyL = [];
        currentPlayer = "player1";
        $("#winMessage").html("");
        $("#winMessage").css("border", "none");
        $(".hole").removeClass("winner");
        $("#Player1Name").removeClass("winnerText");
        $("#Player2Name").removeClass("winnerText");

        addTokenOnClick();
    });

    startButton.on("click", function () {
        activeGame = true;

        $("#game").toggle(1000);
        $("#inputs").toggle(1000);
        $("#newGame").toggle();
        $("#favicon").toggle();
        startButton.toggle();

        if ($("#player1Name").val() != "") {
            player1Name = $("#player1Name").val();
            $("#Player1Name").html(player1Name);
        }
        if ($("#player2Name").val() != "") {
            player2Name = $("#player2Name").val();
            $("#Player2Name").html(player2Name);
        }

        if ($("#columns").val() != "") {
            columns = $("#columns").val();
        } else {
            columns = 7;
        }
        // console.log({ columns });

        if ($("#rows").val() != "") {
            rows = $("#rows").val();
        } else {
            rows = 6;
        }
        if ($("#winCondition").val() != "") {
            winCondition = $("#winCondition").val();
        } else {
            winCondition = 4;
        }
        numberOfSlots = rows * columns;
        // console.log({ columns, rows });
        document.getElementById(
            "game"
        ).style.cssText = `display:grid;grid-auto-flow:column;width:70vw;height:80vh;background-color:lavender;padding: 4% 0.5%; grid-template: repeat(${rows}, 1fr) / repeat(${columns}, 1fr)`;
        fillBoard(numberOfSlots);
        addTokenOnClick();
    });

    function fillBoard(numberOfSlots) {
        for (var i = 0; i < numberOfSlots; i++) {
            slotHtml += '<div class="slot"><div class="hole"></div></div>';
        }
        $("#game").html(slotHtml);
    }

    function addTokenOnClick() {
        for (var i = 0; i < numberOfSlots; i++) {
            (function (clickedNubmer) {
                $(".hole")
                    .eq(i)
                    .on("click", function (e) {
                        console.log("clicked", clickedNubmer);
                        num = clickedNubmer;
                        columnNumber = Math.floor(num / rows);
                        rowNumber = num % rows;

                        rowBottom = columnNumber * rows + (rows - 1);

                        rowTop = columnNumber * rows;
                        console.log("new check");
                        // console.log({ columnNumber });
                        // console.log({ rowNumber });
                        // console.log("onClick", { columns });
                        // console.log("onClick", { rows });
                        // console.log({ rowBottom });
                        // console.log({ rowTop });

                        addCoinInTurn();
                    });
            })(i);
        }
    }

    function addCoinInTurn() {
        for (var i = rowBottom; i + 1 > rowTop; i--) {
            if (
                !$(".hole").eq(i).hasClass("player1") &&
                !$(".hole").eq(i).hasClass("player2")
            ) {
                $(".hole").eq(i).addClass(currentPlayer);

                num = i;
                startingNumber = num;
                currentRowNumber = num % rows;

                currentColumnNumberD = Math.floor(num / rows);
                startingNumberD = num;
                // u=up D=down L=Left R=Right DRU=Diagonally Right up etc.
                currentRowNumberDRD = num % rows;
                currentColumnNumberDRD = Math.floor(num / rows);

                currentRowNumberU = num % rows;
                currentColumnNumberU = Math.floor(num / rows);
                currentRowNumberL = num % rows;
                currentColumnNumberL = Math.floor(num / rows);
                currentRowNumberR = num % rows;
                currentColumnNumberR = Math.floor(num / rows);
                currentRowNumberDRU = num % rows;
                currentColumnNumberDRU = Math.floor(num / rows);

                currentRowNumberDLU = num % rows;
                currentColumnNumberDLU = Math.floor(num / rows);
                currentRowNumberDLD = num % rows;
                currentColumnNumberDLD = Math.floor(num / rows);

                winArrayVertically.push(num);
                winArrayHorizontallyL.push(num);
                winArrayHorizontallyR.push(num);
                winArrayDiagonallyR.push(num);
                winArrayDiagonallyL.push(num);
                checkNumDown = startingNumber - 1;
                checkNumUp = startingNumber + 1;
                checkNumRight = startingNumber + rows;
                checkNumLeft = startingNumber - rows;
                checkNumDiagonallyRightUp = startingNumber + rows - 1;
                checkNumDiagonallyLeftUp = startingNumber - rows - 1;
                checkNumDiagonallyRightDown = startingNumber - rows + 1;
                checkNumDiagonallyLeftDown = startingNumber + rows + 1;
                // console.log({ i, currentRowNumberDRD, currentColumnNumberDRD });
                break;
            }
            if (i === rowTop) {
                console.log({ rowTop }, "the column is full");
                return;
            }
        }
        checkforVictory();
        switchPlayer();
    }

    function checkforVictory() {
        checkforVictoryHorizontallyLeft();
        checkforVictoryHorizontallyRight();
        checkforVictoryVertivallyDown();
        checkforVictoryVertivallyUp();
        checkforVictoryDiagonallyRightUp();
        checkforVictoryDiagonallyRightDown();
        checkforVictoryDiagonallyLeftDown();
        checkforVictoryDiagonallyLeftUp();

        if (
            winArrayVertically.length >= winCondition ||
            winArrayHorizontallyL.length >= winCondition ||
            winArrayHorizontallyR.length >= winCondition ||
            winArrayDiagonallyR.length >= winCondition ||
            winArrayDiagonallyL.length >= winCondition
        ) {
            console.log(
                "Congratulations, " + currentPlayer + " won",
                { winArrayHorizontallyR },
                { winArrayHorizontallyL },
                { winArrayVertically },
                { winArrayDiagonallyL },
                { winArrayDiagonallyR },
                winCondition
            );
            currentPlayer === "player1" ? scorePlayer1++ : scorePlayer2++;
            $("#player1Score").html(scorePlayer1);
            $("#player2Score").html(scorePlayer2);
            $(".hole").off("click");
            currentPlayer === "player1"
                ? (currentPlayerName = player1Name)
                : (currentPlayerName = player2Name);

            currentPlayer === "player1"
                ? $("#Player1Name").addClass("winnerText")
                : $("#Player2Name").addClass("winnerText");

            $("#winMessage").html(
                "Congratulations, " + currentPlayerName + " won!! 🥳🎉😎"
            );
            $("#winMessage").css("border", "8px dotted rebeccapurple");

            showWinner(winArrayHorizontallyL);
            showWinner(winArrayHorizontallyR);
            showWinner(winArrayVertically);
            showWinner(winArrayDiagonallyL);
            showWinner(winArrayDiagonallyR);
        } else {
            winArrayHorizontallyL = [];
            winArrayHorizontallyR = [];
            winArrayVertically = [];
            winArrayDiagonallyL = [];
            winArrayDiagonallyR = [];
            currentPlayer === "player1"
                ? (currentPlayerName = player2Name)
                : (currentPlayerName = player1Name);
            $("#winMessage").html(
                currentPlayerName + " - your time to make a move."
            );
            currentPlayer === "player1"
                ? $("#winMessage").css("color", "navy")
                : $("#winMessage").css("color", "steelblue");
        }
    }

    function checkforVictoryVertivallyDown() {
        checkRowNumberDown = checkNumDown % rows;
        checkColumnNumberDown = Math.floor(checkNumDown / rows);
        // console.log({ checkRowNumberDown });
        // console.log({ checkColumnNumberDown });
        if (
            columnNumber === checkColumnNumberDown &&
            $(".hole").eq(checkNumDown).hasClass(currentPlayer)
        ) {
            console.log("Added to win array");
            winArrayVertically.push(checkNumDown);
            checkNumDown -= 1;
            checkforVictoryVertivallyDown();
        } else {
            return;
        }
    }
    function checkforVictoryVertivallyUp() {
        checkRowNumberUp = checkNumUp % rows;
        checkColumnNumberUp = Math.floor(checkNumUp / rows);
        // console.log({ checkRowNumberUp });
        // console.log({ checkColumnNumberUp });
        if (
            columnNumber === checkColumnNumberUp &&
            $(".hole").eq(checkNumUp).hasClass(currentPlayer)
        ) {
            console.log("Added to win array");
            winArrayVertically.push(checkNumUp);

            checkNumUp += 1;
            checkforVictoryVertivallyUp();
        } else {
            return;
        }
    }
    function checkforVictoryHorizontallyRight() {
        checkRowNumberRight = checkNumRight % rows;
        checkColumnNumberRight = Math.floor(checkNumRight / rows);
        // console.log({ checkRowNumberRight });
        // console.log({ checkColumnNumberRight });
        if (checkNumRight > -1) {
            if (
                currentRowNumberR === checkRowNumberRight &&
                $(".hole").eq(checkNumRight).hasClass(currentPlayer)
            ) {
                console.log("Added to win array");
                winArrayHorizontallyR.push(checkNumRight);
                console.log("Right", { winArrayVertically });

                checkNumRight += rows;
                console.log({ checkNumRight });
                checkforVictoryHorizontallyRight();
            } else {
                return;
            }
        }
    }

    function checkforVictoryHorizontallyLeft() {
        checkRowNumberLeft = checkNumLeft % rows;
        checkColumnNumberLeft = Math.floor(checkNumLeft / rows);
        // console.log({ checkRowNumberLeft });
        // console.log({ checkColumnNumberLeft });
        // console.log({ currentRowNumber, checkRowNumberLeft });
        if (checkNumLeft > -1) {
            console.log({ currentRowNumberL });
            if (
                currentRowNumberL === checkRowNumberLeft &&
                $(".hole").eq(checkNumLeft).hasClass(currentPlayer)
            ) {
                console.log("Added to win array");
                winArrayHorizontallyL.push(checkNumLeft);
                console.log("Left", { winArrayVertically });

                checkNumLeft -= rows;
                checkforVictoryHorizontallyLeft();
            } else {
                return;
            }
        }
    }

    function checkforVictoryDiagonallyRightDown() {
        checkRowNumberDiagonallyRightDown = checkNumDiagonallyRightDown % rows;
        checkColumnNumberDiagonallyRightDown = Math.floor(
            checkNumDiagonallyRightDown / rows
        );
        // console.log({ currentRowNumberDRD, checkRowNumberDiagonallyRightDown });
        // console.log({
        //     currentColumnNumberDRD,
        //     checkColumnNumberDiagonallyRightDown,
        // });

        if (
            currentRowNumberDRD + 1 === checkRowNumberDiagonallyRightDown &&
            currentColumnNumberDRD - 1 ===
                checkColumnNumberDiagonallyRightDown &&
            $(".hole").eq(checkNumDiagonallyRightDown).hasClass(currentPlayer)
        ) {
            // console.log("Added to win array Right down");
            winArrayDiagonallyR.push(checkNumDiagonallyRightDown);
            // console.log("Right Down Diagonally", { winArrayDiagonallyR });

            checkNumDiagonallyRightDown -= rows - 1;
            currentRowNumberDRD = checkRowNumberDiagonallyRightDown;
            currentColumnNumberDRD = checkColumnNumberDiagonallyRightDown;
            // console.log({ checkNumDiagonallyRightDown });
            checkforVictoryDiagonallyRightDown();
        } else {
            return;
        }
    }

    function checkforVictoryDiagonallyRightUp() {
        checkRowNumberDiagonallyRightUp = checkNumDiagonallyRightUp % rows;
        checkColumnNumberDiagonallyRightUp = Math.floor(
            checkNumDiagonallyRightUp / rows
        );
        // console.log({ currentRowNumberDRU, checkRowNumberDiagonallyRightUp });
        // console.log({
        //     currentColumnNumberDRU,
        //     checkColumnNumberDiagonallyRightUp,
        // });

        if (
            currentRowNumberDRU - 1 === checkRowNumberDiagonallyRightUp &&
            currentColumnNumberDRU + 1 === checkColumnNumberDiagonallyRightUp &&
            $(".hole").eq(checkNumDiagonallyRightUp).hasClass(currentPlayer)
        ) {
            // console.log("Added to win array Right down");
            winArrayDiagonallyR.push(checkNumDiagonallyRightUp);
            // console.log("Right Up Diagonally", { winArrayDiagonallyR });

            checkNumDiagonallyRightUp -= rows + 1;
            currentRowNumberDRU = checkRowNumberDiagonallyRightUp;
            currentColumnNumberDRU = checkColumnNumberDiagonallyRightUp;
            // console.log({ checkNumDiagonallyRightUp });
            checkforVictoryDiagonallyRightUp();
        } else {
            return;
        }
    }

    function checkforVictoryDiagonallyLeftUp() {
        checkRowNumberDiagonallyLeftUp = checkNumDiagonallyLeftUp % rows;
        checkColumnNumberDiagonallyLeftUp = Math.floor(
            checkNumDiagonallyLeftUp / rows
        );
        // console.log({ currentRowNumberDLU, checkRowNumberDiagonallyLeftUp });
        // console.log({
        //     currentColumnNumberDLU,
        //     checkColumnNumberDiagonallyLeftUp,
        // });

        if (
            currentRowNumberDLU - 1 === checkRowNumberDiagonallyLeftUp &&
            currentColumnNumberDLU - 1 === checkColumnNumberDiagonallyLeftUp &&
            $(".hole").eq(checkNumDiagonallyLeftUp).hasClass(currentPlayer)
        ) {
            // console.log("Added to win array Left up");
            winArrayDiagonallyL.push(checkNumDiagonallyLeftUp);
            // console.log("Left Up Diagonally", { winArrayDiagonallyL });

            checkNumDiagonallyLeftUp -= rows + 1;
            currentRowNumberDLU = checkRowNumberDiagonallyLeftUp;
            currentColumnNumberDLU = checkColumnNumberDiagonallyLeftUp;
            // console.log({ checkNumDiagonallyLeftUp });
            checkforVictoryDiagonallyLeftUp();
        } else {
            return;
        }
    }
    function checkforVictoryDiagonallyLeftDown() {
        checkRowNumberDiagonallyLeftDown = checkNumDiagonallyLeftDown % rows;
        checkColumnNumberDiagonallyLeftDown = Math.floor(
            checkNumDiagonallyLeftDown / rows
        );
        // console.log({ currentRowNumberDLD, checkRowNumberDiagonallyLeftDown });
        // console.log({
        //     currentColumnNumberDLD,
        //     checkColumnNumberDiagonallyLeftDown,
        // });

        if (
            currentRowNumberDLD + 1 === checkRowNumberDiagonallyLeftDown &&
            currentColumnNumberDLD + 1 ===
                checkColumnNumberDiagonallyLeftDown &&
            $(".hole").eq(checkNumDiagonallyLeftDown).hasClass(currentPlayer)
        ) {
            // console.log("Added to win array Left down");
            winArrayDiagonallyL.push(checkNumDiagonallyLeftDown);
            // console.log("Left Down Diagonally", { winArrayDiagonallyL });

            checkNumDiagonallyLeftDown += rows + 1;
            currentRowNumberDLD = checkRowNumberDiagonallyLeftDown;
            currentColumnNumberDLD = checkColumnNumberDiagonallyLeftDown;
            // console.log({ checkNumDiagonallyLeftDown });
            checkforVictoryDiagonallyLeftDown();
        } else {
            return;
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
    }

    function showWinner(Array) {
        if (Array.length > winCondition - 1) {
            for (var i = 0; i < Array.length; i++) {
                var x = Array[i];
                console.log({ x });
                console.log(Array.length);
                $(".hole").eq(x).addClass("winner");
            }
        }
    }

    function resetSlider() {
        $("#columnsRange").text(
            `How many columns would you like to have? Columns: ${$(
                "#columns"
            ).val()}`
        );
        $("#rowsRange").text(
            `How many rows would you like to have? Rows: ${$("#rows").val()}`
        );
        $("#winconditionText").text(
            `How many connected pieces are required for a win? Length: ${$(
                "#winCondition"
            ).val()}`
        );
    }

    $(document).on("click", function () {
        checkforFull(numberOfSlots);
    });

    function checkforFull(slotsTotal) {
        var boardFull = 0;
        for (let i = 0; i < slotsTotal; i++) {
            if ($(".hole").eq(i).hasClass("player1")) {
                boardFull++;
            }
            if ($(".hole").eq(i).hasClass("player1")) {
                boardFull++;
            }
        }
        // console.log({ boardFull, slotsTotal });
        if (boardFull == slotsTotal) {
            $("#winMessage").html("You've reached a stalemate. Try again!");
        } else {
            boardFull = 0;
        }
    }
})();
