document.getElementById('draw').addEventListener('click', function() {
    const sides = parseInt(document.getElementById('sides').value);
    const container = document.getElementById('polygon-container');
    container.innerHTML = ''; // 이전 도형 제거
    document.getElementById('diagonal-count').innerHTML = ''; // 이전 대각선 개수 제거

    if (sides < 3) {
        alert('정다각형은 3개 이상의 변이 필요합니다.');
        return;
    }

    const radius = 150; // 반지름을 늘려서 도형을 더 크게 만듭니다.
    const centerX = 200; // 중심 x 좌표
    const centerY = 150; // 중심 y 좌표 (위쪽으로 이동)

    let points = [];
    
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 * i) / sides; // 각 변의 각도
        const x = centerX + radius * Math.cos(angle); // x 좌표
        const y = centerY + radius * Math.sin(angle); // y 좌표
        points.push({x, y}); // 좌표를 배열에 저장
    }

    // 정다각형 그리기
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
    polygon.setAttribute("fill", "lightblue");
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("stroke-width", "2");
    container.appendChild(polygon);

    let diagonalCount = 0; // 대각선 개수 초기화

    // 대각선 그리기
    for (let i = 0; i < sides; i++) {
        for (let j = i + 2; j < sides; j++) { // 대각선을 그리기 위한 조건
            if (i !== 0 || j !== sides - 1) { // 인접한 두 점은 제외
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", points[i].x);
                line.setAttribute("y1", points[i].y);
                line.setAttribute("x2", points[j].x);
                line.setAttribute("y2", points[j].y);
                
                // 굵기 조정: 각형 수에 따라 대각선의 굵기를 줄임
                const strokeWidth = Math.max(1, 5 - (sides - 3)); // 각형 수가 많아질수록 굵기 감소
                line.setAttribute("stroke", "darkorange"); // 대각선 색상을 진한 주황색으로 변경
                line.setAttribute("stroke-width", strokeWidth);
                container.appendChild(line);

                diagonalCount++; // 대각선 개수 증가
            }
        }
    }

    // 대각선 총 개수 출력
    document.getElementById('diagonal-count').innerHTML = `대각선 총 개수: ${diagonalCount}`;
});
