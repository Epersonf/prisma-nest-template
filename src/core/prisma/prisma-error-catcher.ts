import { HttpException, HttpStatus } from "@nestjs/common";

export class PrismaErrorCatcher {

  static handle(error: any) {
    if (error?.code === 'P2000') {
      throw new HttpException('The provided value for the column is too long for the column\'s type.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2001') {
      throw new HttpException('The record searched for in the where condition does not exist.', HttpStatus.NOT_FOUND);
    } else if (error?.code === 'P2002') {
      throw new HttpException(`Unique constraint failed on the database record: ${error?.meta?.target}`, HttpStatus.CONFLICT);
    } else if (error?.code === 'P2003') {
      throw new HttpException('Foreign key constraint failed on the database record.', HttpStatus.CONFLICT);
    } else if (error?.code === 'P2004') {
      throw new HttpException('A constraint failed on the database record, such as on the length of a string.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2005') {
      throw new HttpException('The value provided in the `where` clause is invalid for the field.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2006') {
      throw new HttpException('The provided value for a relation field in the data input is invalid.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2007') {
      throw new HttpException('Data validation error on the database record.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2008') {
      throw new HttpException('Failed to parse the query.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2009') {
      throw new HttpException('Failed to validate the query.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2010') {
      throw new HttpException(`Raw query failed: ${error?.meta?.message || 'Unknown raw query error'}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (error?.code === 'P2011') {
      throw new HttpException('Null constraint violation on the database record.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2012') {
      throw new HttpException('Missing a required value in the data input.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2013') {
      throw new HttpException('Missing a required argument in the data input.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2014') {
      throw new HttpException('The change you are trying to make would violate the required relation.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2015') {
      throw new HttpException('A related record could not be found.', HttpStatus.NOT_FOUND);
    } else if (error?.code === 'P2016') {
      throw new HttpException('Query interpretation error.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2017') {
      throw new HttpException('The records for relation between the parent and child models are not connected.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2018') {
      throw new HttpException('The required connected records were not found.', HttpStatus.NOT_FOUND);
    } else if (error?.code === 'P2019') {
      throw new HttpException('Input error.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2020') {
      throw new HttpException('Value out of range for the type.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2021') {
      throw new HttpException('The table does not exist in the current database.', HttpStatus.NOT_FOUND);
    } else if (error?.code === 'P2022') {
      throw new HttpException('The column does not exist in the current database.', HttpStatus.NOT_FOUND);
    } else if (error?.code === 'P2023') {
      throw new HttpException('Inconsistent column data.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2024') {
      throw new HttpException('Timed out fetching a new connection from the connection pool.', HttpStatus.REQUEST_TIMEOUT);
    } else if (error?.code === 'P2025') {
      throw new HttpException('An operation failed because it depends on one or more records that were required but not found.', HttpStatus.NOT_FOUND);
    } else if (error?.code === 'P2026') {
      throw new HttpException('The current database provider doesn\'t support a feature that the query used.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2027') {
      throw new HttpException('Multiple errors occurred on the database during query execution.', HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (error?.code === 'P2028') {
      throw new HttpException('Transaction API error.', HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (error?.code === 'P2030') {
      throw new HttpException('Cannot find a fulltext index to search for.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2031') {
      throw new HttpException('Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2033') {
      throw new HttpException('A constraint failed on the database: ${error?.meta?.message || \'Unknown constraint error\'}', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2034') {
      throw new HttpException('The transaction failed because of a deadlock.', HttpStatus.CONFLICT);
    } else if (error?.code === 'P2035') {
      throw new HttpException('The query was intentionally cancelled.', HttpStatus.BAD_REQUEST);
    } else if (error?.code === 'P2036') {
      throw new HttpException('The query could not be executed because the database server is currently unavailable.', HttpStatus.SERVICE_UNAVAILABLE);
    } else if (error?.code === 'P2037') {
      throw new HttpException('The query could not be executed because the database server has encountered an error.', HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (error?.code?.startsWith('P3')) { // Migration errors
      throw new HttpException(`Prisma Migrate error: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } else if (error?.code?.startsWith('P4')) { // Schema errors
      throw new HttpException(`Prisma Schema error: ${error?.message}`, HttpStatus.BAD_REQUEST);
    } else if (error?.code?.startsWith('P5')) { // Data proxy errors
      throw new HttpException(`Prisma Data Proxy error: ${error?.message}`, HttpStatus.BAD_GATEWAY);
    } else if (error?.code?.startsWith('P6')) { // Prisma Client Engine errors
      throw new HttpException(`Prisma Client Engine error: ${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      throw new HttpException('An unexpected database error occurred.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}