import express from "express";
import { IUserPublic } from "./types/user";

declare global {
  namespace Express {
    interface Locals {
      user: null | IUserPublic;
    }
  }
}
