export class SearchOneKeyword {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr
      ? {
        $or: [
          { title: { $regex: this.queryStr, $options: 'i' } },
          { body: { $regex: this.queryStr, $options: 'i' } }
        ]
      }
    : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
}


export class SearchTwoKeywords {
  query: any;
  queryStr: any;
  keyword1: any;
  keyword2: any;

  constructor(query: any, keyword1: any, keyword2: any) {
    this.query = query;
    this.keyword1 = keyword1;
    this.keyword2 = keyword2;
  }

  search() {
    const keyword1Search = this.keyword1
      ? {
          $or: [
            { title: { $regex: this.keyword1, $options: 'i' } },
            { body: { $regex: this.keyword1, $options: 'i' } }
          ]
        }
      : {};

    const keyword2Search = this.keyword2
      ? {
          $or: [
            { title: { $regex: this.keyword2, $options: 'i' } },
            { body: { $regex: this.keyword2, $options: 'i' } }
          ]
        }
      : {};

    this.query = this.query.find({ $or: [keyword1Search, keyword2Search] });
    return this;
  }
}





