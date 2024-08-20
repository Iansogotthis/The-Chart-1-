const svg = d3.select("#chart");
const width = window.innerWidth * 0.9;
const height = window.innerHeight * 0.9;
const centerX = width / 2;
const centerY = height / 2;
const centerSquareSize = Math.min(width, height) / 2;
const smallSquareSize = centerSquareSize / 2;
const smallestSquareSize = smallSquareSize / 2;
const tinySquareSize = smallestSquareSize / 2;

svg.attr("viewBox", `0 0 ${width} ${height}`).attr(
    "preserveAspectRatio",
    "xMidYMid meet",
);

const modal = document.getElementById("myModal");
const modalText = document.getElementById("modal-text");
const btnClose = document.getElementsByClassName("close")[0];
const btnSaveLabel = document.getElementById("save-label");
const btnViewScale = document.getElementById("view-scale");
const btnViewScope = document.getElementById("view-scope");
const btnInclude = document.getElementById("include");
const btnCancel = document.getElementById("cancel");
const labelInput = document.getElementById("label-input");

let currentUrl = "";
let currentTextElement = null;
let currentSquareClass = "";

function openModal(url, className, textElement) {
    modal.style.display = "flex";
    currentUrl = url;
    currentTextElement = textElement;
    currentSquareClass = className;
    labelInput.value = textElement.textContent;
    modalText.textContent = `Square ${className} clicked! Edit Label:`;
}

btnClose.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

btnSaveLabel.onclick = function () {
    if (currentTextElement) {
        currentTextElement.textContent = labelInput.value;
    }
    modal.style.display = "none";
};

btnViewScale.onclick = function () {
    window.location.href = "scaled_view.html";
};

btnViewScope.onclick = function () {
    window.location.href = "scoped_view.html";
};

btnInclude.onclick = function () {
    window.location.href = `included_build.html?class=${currentSquareClass}&parent=${currentTextElement.textContent}`;
};

btnCancel.onclick = function () {
    modal.style.display = "none";
};

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function drawSquare(
    x,
    y,
    size,
    color,
    className,
    depth,
    parentText,
) {
    const rect = svg
        .append("rect")
        .attr("x", x - size / 2)
        .attr("y", y - size / 2)
        .attr("width", size)
        .attr("height", size)
        .attr("class", `square ${className}`)
        .attr("fill", color)
        .on(
            "click",
            debounce(function () {
                const url = `pages/scoped_page_${parentText}_${depth}_${className}.html`;
                const textElement = d3.select(this.nextSibling);
                openModal(url, className, textElement.node());
            }, 200),
        );

    const text = svg
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", size / 5)
        .attr("pointer-events", "none")
        .text(className);
}

// Draw the root square
drawSquare(
    centerX,
    centerY,
    centerSquareSize,
    "lightblue",
    "root",
    1,
    "Center",
);

const corners = [
    [
        centerX - centerSquareSize / 2,
        centerY - centerSquareSize / 2,
    ], // top-left
    [
        centerX + centerSquareSize / 2,
        centerY - centerSquareSize / 2,
    ], // top-right
    [
        centerX - centerSquareSize / 2,
        centerY + centerSquareSize / 2,
    ], // bottom-left
    [
        centerX + centerSquareSize / 2,
        centerY + centerSquareSize / 2,
    ], // bottom-right
];

function drawSquares(corners, size, depth, className, parentText) {
    if (depth > 3) return;

    const colors = {
        root: "lightblue",
        branch: "lightgray",
        leaf: "lightgreen",
        fruit: "lightcoral",
    };

    corners.forEach(([x, y], index) => {
        let currentClassName;
        if (depth === 1) {
            currentClassName = "branch";
        } else if (depth === 2) {
            currentClassName = "leaf";
        } else if (depth === 3) {
            currentClassName = "fruit";
        }

        drawSquare(
            x,
            y,
            size,
            colors[currentClassName] || "",
            currentClassName || "",
            depth,
            parentText,
        );

        if (size > tinySquareSize) {
            const nextSize = size / 2;
            const nextCorners = [
                [x - size / 2, y - size / 2], // top-left
                [x + size / 2, y - size / 2], // top-right
                [x - size / 2, y + size / 2], // bottom-left
                [x + size / 2, y + size / 2], // bottom-right
            ];

            requestAnimationFrame(() => {
                drawSquares(
                    nextCorners,
                    nextSize,
                    depth + 1,
                    currentClassName || "",
                    `${parentText}_${index + 1}`,
                );
            });
        }
    });
}

drawSquares(corners, smallSquareSize, 1, "root", "Root");

function adjustFruitOpacityOnLeafHover() {
    const leafSquares = document.querySelectorAll(".leaf");
    const fruitSquares = document.querySelectorAll(".fruit");

    leafSquares.forEach((leaf) => {
        leaf.addEventListener("mouseover", () => {
            fruitSquares.forEach((fruit) => {
                fruit.style.opacity = "1";
            });
        });

        leaf.addEventListener("mouseout", () => {
            fruitSquares.forEach((fruit) => {
                fruit.style.opacity = "0.3";
            });
        });
    });
}
