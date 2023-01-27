
function createFireMission() {
    f_grid1 = document.getElementById('f_grid1')
    f_grid2 = document.getElementById('f_grid2')
    f_alt = document.getElementById('f_alt')
    f_name = document.getElementById('f_name')

    e_grid1 = document.getElementById('e_grid1')
    e_grid2 = document.getElementById('e_grid2')
    e_alt = document.getElementById('e_alt')
    rounds = document.getElementById('e_round')

    distance = document.getElementById('f_dist')

    rbod = document.getElementById('RATELBody')
    fbod = document.getElementById('fireMissionsBody')

    elev = {
        [82]: {
            [0]: [1441, 1264, 1006],
            [1]: [1482, 1441, 1400, 1357, 1312, 1264, 1213, 1155, 1089, 1006, 846],
            [2]: [1513, 1495, 1477, 1459, 1441, 1423, 1404, 1386, 1366, 1347, 1327, 1307, 1286, 1264, 1242, 1218, 1194, 1169, 1142, 1113, 1081, 1046, 1006, 956, 881],
            [3]: [1512, 1502, 1492, 1482, 1472, 1462, 1452, 1441, 1431, 1421, 1410, 1400, 1389, 1378, 1368, 1357, 1346, 1335, 1323, 1312, 1300, 1288, 1276, 1264, 1252, 1239, 1226, 1213, 1199, 1185, 1170, 1155, 1140, 1124, 1107, 1089, 1071, 1051, 1029, 1006, 980, 949, 910, 846],
            [4]: [1512, 1506, 1499, 1493, 1487, 1480, 1474, 1467, 1461, 1454, 1448, 1441, 1435, 1428, 1422, 1415, 1408, 1401, 1395, 1388, 1381, 1374, 1367, 1360, 1353, 1346, 1339, 1332, 1325, 1317, 1310, 1302, 1295, 1287, 1280, 1272, 1264, 1256, 1248, 1240, 1232, 1223, 1215, 1206, 1197, 1188, 1179, 1170, 1160, 1151, 1141, 1130, 1120, 1109, 1098, 1087, 1075, 1062, 1049, 1036, 1021, 1006, 989, 971, 951, 928, 900, 861],
        }
    }

    elevPer100 = {
        [82]: {
            [0]: [32, 77, 187],
            [1]: [8, 11, 14, 18, 23, 28, 35, 44, 58, 84, 176],
            [2]: [0, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10, 11, 12, 14, 15, 17, 19, 21, 24, 27, 31, 37, 46, 60, 94],
            [3]: [2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 15, 17, 18, 20, 22, 25, 28, 33, 40, 52, 85],
            [4]: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 27, 32, 40, 56],
        }
    }

    elevStart = {
        [82]: {
            [0]: 1,
            [1]: 3,
            [2]: 5,
            [3]: 9,
            [4]: 14,
        }
    }

    x = e_grid1.value - f_grid1.value
    y = e_grid2.value - f_grid2.value

    dist = Math.round(Math.sqrt(((x * 10) ** 2) + ((y * 10) ** 2)))

    charge = "!OUT OF RANGE!"
    az = "!OUT OF RANGE!"
    elevation = "!OUT OF RANGE!"

    if (dist <= 150) {
        charge = 0
    }
    else if (dist <= 650) {
        charge = 1
    }
    else if (dist <= 1450) {
        charge = 2
    }
    else if (dist <= 2600) {
        charge = 3
    }
    else if (dist <= 4050) {
        charge = 4
    }

    if (charge != "!OUT OF RANGE!") {
        degrees = Math.atan2(x, y) * (180/Math.PI)

        if (degrees < 0) {
            az = 360 + degrees
        }
        else {
            az = degrees
        }

        az = Math.round(az * 17.777778)

        startingPos = elevStart[82][charge]

        var i
        for (i = 0; i < elev[82][charge].length; i++) {
            if ((elevStart[82][charge] + i) * 50 < dist && ((elevStart[82][charge] + i) * 50 ) + 50 > dist) {
                elevation = elev[82][charge][i]

                adjustments = Math.round(((f_alt.value - e_alt.value) / 100) * elevPer100[82][charge][i])

                elevation += adjustments
                break
            }
        }
        
    }


    bod = rbod.innerHTML
    bod += `
        <tr>
            <td>${"FM-" + f_name.value}</td>
            <td>${e_grid1.value.toString() + " " + e_grid2.value.toString()}</td>
            <td>${rounds.value}</td>
        </tr>
    `
    rbod.innerHTML = bod    


    bod = fbod.innerHTML

    bod += `
        <tr>
            <td>${f_name.value}</td>
            <td>${charge}</td>
            <td>${az}</td>
            <td>${elevation}</td>
        </tr>
    `
    fbod.innerHTML = bod    


    distance.value = dist
}

function clearFireMission() {
    e_grid1 = document.getElementById('e_grid1')
    e_grid2 = document.getElementById('e_grid2')
    e_alt = document.getElementById('e_alt')
    rounds = document.getElementById('e_round')

    e_grid1.value = ""
    e_grid2.value = ""
    e_alt.value = ""
    rounds.value = ""
}