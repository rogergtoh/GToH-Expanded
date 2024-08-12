class LevelCompressor {
  constructor(data) {
    this.data = data;
    this.dict = [];
  }

  compress() {
    this.dict = [];


    let newData = "";
    for (const i in this.data) {
      newData += this.compressBlock(this.data[i]);
    }

    console.log("compression finished!");
    return [this.dict, newData];
  }

  addDict(string) {
    if (this.dict.includes(string)) {
      return this.dict.indexOf(string).toString(36);
    } else {
      this.dict.push(string);
      return (this.dict.length - 1).toString(36);
    }
  }

  compressNumber(num) {
    return Math.abs(num).toString(36) + (Math.sign(num) === 1 ? ":" : ";");
  }

  compressTags(tags, hasoImg) {
    if (tags.length === 0) {
      return ":";
    } 
    let newTag = "";
    for (let t = 0; t < tags.length - 1; t++) {
      newTag += this.addDict(tags[t]) + ",";
    }
    newTag += this.addDict(tags[tags.length - 1]) + (hasoImg ? ";" : ":");
    return newTag;
  }

  compressBlock(block) {
    let compressedBlock = this.compressNumber(block[0]) + this.compressNumber(block[1]);
    compressedBlock += this.addDict(block[2]) + ":";
    compressedBlock += this.compressNumber(block[3]) + this.compressNumber(block[4]);

    if (block.length > 5) {
      compressedBlock += this.compressTags(block[5], block.length > 6);
      if (block.length > 6) {
        compressedBlock += this.addDict(block[6]) + ":";
      }
    } else {
      compressedBlock += ":";
    }

    return compressedBlock;
  }
}

class LevelDecompressor {
  constructor(data) {
    this.dict = data[0];
    this.data = data[1];
    this.pos = 0;
  }

  decompress() {
    this.pos = 0;

    const data = [];
    for (this.pos; this.pos < this.data.length;) {

      const nextBlock = this.getNextBlock();
      if (nextBlock === false) {
        console.log("current data: \n" + JSON.stringify(data))
        console.log("cancelling decompression...")
        return false;
      }
      data.push(nextBlock);

      // If finished
      if (this.pos >= this.data.length - 1) {
        console.log("decompression finished!");
        return data;
      }
    }

    console.log("error! Couldn't decompress following data:");
    console.log(this.data);
    alert("An error occured while decompressing the level! \nIn decompress() Array Overflow at start: " + this.pos);
  }

  getNextBlock() {
    const block = [];

    for(let i = 0; i < 5; i++) {
      const nextValue = this.getNextValue();
      if (nextValue === false) {
        console.log("getNextValue errored at block iteration " + i);
        return false;
      }
      block[i] = nextValue;
    }

    const tags = this.getTags();
    if (tags[0].length > 0 || tags.length > 1) { // if tags aren't empty. Also needed if oImg exists.
      block.push([]);
      for (const tag in tags[0]) {
        block[5].push(this.dict[tags[0][tag]]);
      }
    }
    if (tags.length > 1) { // if oImg exists
      block.push(this.dict[tags[1]]);
    }

    block[2] = this.dict[block[2]];

    return block;
  }

  getNextValue() {
    let value = "";
    const start = this.pos;

    for (this.pos; this.pos < this.data.length; this.pos++) {
      if (this.data[this.pos] === ";" || this.data[this.pos] === ":") {
        return parseInt(value, 36) * (this.data[this.pos++] === ":" ? 1: -1);
      } else {
        value += this.data[this.pos];
      }
    }
    console.log("An error occured while decompressing the level! \nIn getNextValue() Array Overflow at start: " + start);
    alert("An error occured while decompressing the level! \nIn getNextValue() Array Overflow at start: " + start);
    return false;
  }
  // TODO: Add error detection for tag stuff 
  getTags() {
    const tags = [];
    for (this.pos; this.pos < this.data.length; this.pos++) {
      const nextTag = this.getNextTag();
      if (nextTag[0] !== "") {
        tags.push(nextTag[0]);
      }
      if (nextTag[1] === 1) {
        this.pos++;
        return [tags];
      } else if (nextTag[1] === 2) {
        this.pos++;
        return [tags, this.getoImg()];
      }
    }
  }
  
  getoImg() {
    let oImg = "";
    for (this.pos; this.pos < this.data.length; this.pos++) {
      if (this.data[this.pos] === ":") {
        return parseInt(oImg, 36);
      }
      oImg += this.data[this.pos];
    }
    console.log("getoImg() ERROR!!!! overflow")
  }

  getNextTag() { // SOMEHOW SKIPS 1 SO FIX IT!!!!
    let tag = "";
    for (this.pos; this.pos < this.data.length; this.pos++) {
      switch (this.data[this.pos]) {
        case ";":
          return [(tag == "") ? tag : parseInt(tag, 36), 2]; // 2 means has oImg
        case ":":
          return [(tag == "") ? tag : parseInt(tag, 36), 1]; // 1 means no oImg
        case ",":
          return [parseInt(tag, 36), 0]; // 0 means more tags
        default:
          tag += this.data[this.pos];
          break;
      }
    }
    console.log("getNextTag Error!!!! overflow")
  }
}


function fastExportId(lvlId) {
  return JSON.stringify(new LevelCompressor(lvlData[lvlId].data).compress());
} 


/*

Format:

data is a string with a separator char. make sure it doesn't show up in text

[xPos, yPos, "type", xLength, yLength, tags, texture]

 |
\_/

jf:1g:1:5:5:1,2:1

KEY

Negative number uses ; instead of :

1: Compressed xPos
2: Compressed yPos
3: type is cached as a unique identifier at the end
4: Compressed xLength
5: Compressed yLength
6: identifiers separated with ,
7: if included also an identifier


Dictionary Format:

[
"identifier 11!"
]

*/