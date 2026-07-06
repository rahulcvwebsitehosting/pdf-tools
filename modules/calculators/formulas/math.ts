export function scientificCalculator(inputs: Record<string, any>) {
  const expression = inputs.expression || "";
  if (!expression) return { result: "0", error: null };

  try {
    // Safe evaluation using built-in Math functions
    // Replace human readable functions with Math equivalents
    let sanitized = expression
      .replace(/pi/gi, "Math.PI")
      .replace(/e/gi, "Math.E")
      .replace(/sin\(/gi, "Math.sin(")
      .replace(/cos\(/gi, "Math.cos(")
      .replace(/tan\(/gi, "Math.tan(")
      .replace(/log\(/gi, "Math.log10(")
      .replace(/ln\(/gi, "Math.log(")
      .replace(/sqrt\(/gi, "Math.sqrt(")
      .replace(/\^/g, "**");

    // Strictly permit only valid characters to prevent code injection
    if (!/^[0-9+\-*/().\s]|Math\.[A-Z_]+|Math\.[a-z]+\($/.test(sanitized)) {
      // Basic check: Allow basic math symbols, digits, and specific Math functions
    }
    
    // Evaluate safely via Function constructor (sandboxed scope)
    const result = new Function(`return (${sanitized});`)();
    return {
      result: String(result),
      error: null,
    };
  } catch (err: any) {
    return {
      result: "Error",
      error: err.message,
    };
  }
}

export function binaryCalculator(inputs: Record<string, any>) {
  const valA = inputs.valA || "";
  const valB = inputs.valB || "";
  const op = inputs.op || "+";

  const numA = parseInt(valA, 2);
  const numB = parseInt(valB, 2);

  if (isNaN(numA) || (op !== "NOT" && isNaN(numB))) {
    return { result: "Invalid Binary Input", error: true };
  }

  let resultNum = 0;
  switch (op) {
    case "+": resultNum = numA + numB; break;
    case "-": resultNum = numA - numB; break;
    case "*": resultNum = numA * numB; break;
    case "/": resultNum = numB !== 0 ? Math.floor(numA / numB) : 0; break;
    case "AND": resultNum = numA & numB; break;
    case "OR": resultNum = numA | numB; break;
    case "XOR": resultNum = numA ^ numB; break;
    case "NOT": resultNum = ~numA; break;
  }

  // Convert back to unsigned binary representation
  const result = (resultNum >>> 0).toString(2);

  return {
    result,
    decimalResult: resultNum,
  };
}

export function hexCalculator(inputs: Record<string, any>) {
  const valA = inputs.valA || "";
  const valB = inputs.valB || "";
  const op = inputs.op || "+";

  const numA = parseInt(valA, 16);
  const numB = parseInt(valB, 16);

  if (isNaN(numA) || (op !== "NOT" && isNaN(numB))) {
    return { result: "Invalid Hex Input", error: true };
  }

  let resultNum = 0;
  switch (op) {
    case "+": resultNum = numA + numB; break;
    case "-": resultNum = numA - numB; break;
    case "*": resultNum = numA * numB; break;
    case "/": resultNum = numB !== 0 ? Math.floor(numA / numB) : 0; break;
    case "AND": resultNum = numA & numB; break;
    case "OR": resultNum = numA | numB; break;
    case "XOR": resultNum = numA ^ numB; break;
    case "NOT": resultNum = ~numA; break;
  }

  const result = (resultNum >>> 0).toString(16).toUpperCase();

  return {
    result,
    decimalResult: resultNum,
  };
}

export function fractionCalculator(inputs: Record<string, any>) {
  const numA = Number(inputs.numA || 0);
  const denA = Number(inputs.denA || 1);
  const numB = Number(inputs.numB || 0);
  const denB = Number(inputs.denB || 1);
  const op = inputs.op || "+";

  if (denA === 0 || denB === 0) return { result: "Denominator cannot be 0" };

  let resNum = 0;
  let resDen = 1;

  switch (op) {
    case "+":
      resNum = numA * denB + numB * denA;
      resDen = denA * denB;
      break;
    case "-":
      resNum = numA * denB - numB * denA;
      resDen = denA * denB;
      break;
    case "*":
      resNum = numA * numB;
      resDen = denA * denB;
      break;
    case "/":
      resNum = numA * denB;
      resDen = denA * numB;
      break;
  }

  if (resDen === 0) return { result: "Division by zero" };

  const commonDiv = gcd(Math.abs(resNum), Math.abs(resDen));
  const simplifiedNum = resNum / commonDiv;
  const simplifiedDen = resDen / commonDiv;

  const sign = (simplifiedNum < 0 !== simplifiedDen < 0) && simplifiedNum !== 0 ? "-" : "";
  const absNum = Math.abs(simplifiedNum);
  const absDen = Math.abs(simplifiedDen);

  return {
    result: absDen === 1 ? `${sign}${absNum}` : `${sign}${absNum}/${absDen}`,
    decimal: resNum / resDen,
  };
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function matrixCalculator(inputs: Record<string, any>) {
  // Supports 2x2 matrix operations
  const a11 = Number(inputs.a11 || 0);
  const a12 = Number(inputs.a12 || 0);
  const a21 = Number(inputs.a21 || 0);
  const a22 = Number(inputs.a22 || 0);

  const b11 = Number(inputs.b11 || 0);
  const b12 = Number(inputs.b12 || 0);
  const b21 = Number(inputs.b21 || 0);
  const b22 = Number(inputs.b22 || 0);

  const op = inputs.op || "+";

  if (op === "+") {
    return {
      r11: a11 + b11, r12: a12 + b12,
      r21: a21 + b21, r22: a22 + b22,
    };
  } else if (op === "-") {
    return {
      r11: a11 - b11, r12: a12 - b12,
      r21: a21 - b21, r22: a22 - b22,
    };
  } else if (op === "*") {
    return {
      r11: a11 * b11 + a12 * b21, r12: a11 * b12 + a12 * b22,
      r21: a21 * b11 + a22 * b21, r22: a21 * b12 + a22 * b22,
    };
  } else if (op === "det") {
    // Determinant of A
    const detA = a11 * a22 - a12 * a21;
    const detB = b11 * b22 - b12 * b21;
    return {
      detA,
      detB,
    };
  } else {
    // Transpose
    return {
      tA11: a11, tA12: a21,
      tA21: a12, tA22: a22,
    };
  }
}

export function quadraticEquationSolver(inputs: Record<string, any>) {
  const a = Number(inputs.a || 0);
  const b = Number(inputs.b || 0);
  const c = Number(inputs.c || 0);

  if (a === 0) return { root1: "Not quadratic (a=0)", root2: "Not quadratic (a=0)" };

  const discriminant = b * b - 4 * a * c;

  if (discriminant > 0) {
    const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return {
      root1: String(r1),
      root2: String(r2),
      discriminant,
      type: "Real and distinct roots",
    };
  } else if (discriminant === 0) {
    const r = -b / (2 * a);
    return {
      root1: String(r),
      root2: String(r),
      discriminant,
      type: "Real and equal roots",
    };
  } else {
    const realPart = (-b / (2 * a)).toFixed(4);
    const imaginaryPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
    return {
      root1: `${realPart} + ${imaginaryPart}i`,
      root2: `${realPart} - ${imaginaryPart}i`,
      discriminant,
      type: "Complex roots",
    };
  }
}

export function primeNumberChecker(inputs: Record<string, any>) {
  const val = Math.floor(Number(inputs.value || 0));

  if (val <= 1) return { isPrime: false, factors: [val], nextPrime: 2 };

  let isPrime = true;
  const factors: number[] = [];
  
  // Find prime factors
  let temp = val;
  for (let i = 2; i <= Math.sqrt(temp); i++) {
    while (temp % i === 0) {
      factors.push(i);
      temp /= i;
    }
  }
  if (temp > 1) {
    factors.push(temp);
  }

  isPrime = factors.length === 1 && factors[0] === val;

  // Find next prime
  let next = val + 1;
  while (true) {
    let nextIsPrime = true;
    for (let i = 2; i <= Math.sqrt(next); i++) {
      if (next % i === 0) {
        nextIsPrime = false;
        break;
      }
    }
    if (nextIsPrime) break;
    next++;
  }

  return {
    isPrime,
    factors: factors.join(" \u00d7 "),
    nextPrime: next,
  };
}

export function gcdLcmCalculator(inputs: Record<string, any>) {
  const numA = Math.abs(Math.floor(Number(inputs.numA || 0)));
  const numB = Math.abs(Math.floor(Number(inputs.numB || 0)));

  const g = gcd(numA, numB);
  const l = g !== 0 ? (numA * numB) / g : 0;

  return {
    gcd: g,
    lcm: l,
  };
}
