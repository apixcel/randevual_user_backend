export const Controller = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    } else {
      try {
        // write your logic here

        return res.status(201).json({
          success: true,
          msg: "",
        });
      } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      }
    }
  }
);
