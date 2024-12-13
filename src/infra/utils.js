export function getColorFromPriority(weight) {
  const color1 = [255, 71, 76]
  const color2 = [144, 238, 144]
  var w1 = weight
  var w2 = 1 - w1
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ]
  return rgb
}
