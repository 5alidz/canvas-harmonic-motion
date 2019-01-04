const fib = (n) => {
  if(n === 1 || n === 2){
    return 1
  }
  let mem = []
  mem[0] = 1
  mem[1] = 1
  for(let i = 2; i <= n; i++){
    mem[i] = mem[i - 1] + mem[i - 2]
  }
  console.log(mem)
  return mem[n]
}

export default fib
